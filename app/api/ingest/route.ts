import { NextRequest, NextResponse } from 'next/server';
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone"; 
// ✅ FIXED: Importing from the specific package you installed
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { z } from "zod";

const AnalysisSchema = z.object({
  category: z.enum(['Finance', 'HR', 'Legal', 'Compliance', 'Technical']),
  themes: z.array(z.string()).describe("List of 3-5 major recurring themes"),
  summary: z.string().describe("A concise 2-sentence summary"),
  riskLevel: z.enum(['Low', 'Medium', 'High']),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rawText = buffer.toString('utf-8'); 

    const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });
    const structuredLLM = llm.withStructuredOutput(AnalysisSchema);

    const [analysis, chunks] = await Promise.all([
      structuredLLM.invoke(`Analyze this document content: ${rawText.substring(0, 15000)}...`),
      new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 })
        .createDocuments([rawText]),
    ]);

    const pinecone = new Pinecone();
    // Make sure PINECONE_INDEX is set in your .env.local file
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    const enrichedDocs = chunks.map(chunk => ({
      ...chunk,
      metadata: {
        filename: file.name,
        category: analysis.category,
        themes: analysis.themes.join(", "),
        risk: analysis.riskLevel,
        summary: analysis.summary
      }
    }));

    await PineconeStore.fromDocuments(enrichedDocs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });

    return NextResponse.json({ success: true, data: analysis });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}