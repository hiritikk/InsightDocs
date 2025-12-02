// This service runs when a document is uploaded to detect risks
import { prisma } from '@/lib/db';

export async function detectComplianceRisks(text: string, documentId: string) {
  const risks = [];

  // 1. Regex Pattern Matching for PII (Social Security, Credit Cards)
  const ssnPattern = /\d{3}-\d{2}-\d{4}/;
  const creditCardPattern = /\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/;

  if (ssnPattern.test(text)) {
    risks.push({
      type: "PII_EXPOSURE",
      severity: "CRITICAL",
      message: "Potential Social Security Number detected."
    });
  }

  // 2. Keyword Search for Confidentiality
  const confidentialKeywords = ["TOP SECRET", "CONFIDENTIAL", "INTERNAL ONLY"];
  if (confidentialKeywords.some(keyword => text.toUpperCase().includes(keyword))) {
    risks.push({
      type: "RESTRICTED_CONTENT",
      severity: "HIGH",
      message: "Document contains restricted classification markers."
    });
  }

  // 3. Workflow Validation (Phase 2 Requirement)
  // Check if document mentions "Approval Required" but has no signature block
  if (text.includes("Approval Required") && !text.includes("Signed by:")) {
    risks.push({
      type: "UNSIGNED_APPROVAL",
      severity: "MEDIUM",
      message: "Document requires approval but signature block is missing."
    });
  }

  // Save risks to database
  if (risks.length > 0) {
    await prisma.risk.createMany({
      data: risks.map(r => ({
        ...r,
        documentId
      }))
    });

    // Update Document Status
    await prisma.document.update({
      where: { id: documentId },
      data: { 
        riskLevel: risks.some(r => r.severity === "CRITICAL") ? "CRITICAL" : "HIGH" 
      }
    });
  }

  return risks;
}