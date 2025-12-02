import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, Badge, Button } from '@/app/components/shared';

export const UploadView = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null); // To store AI analysis results
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null); // Reset previous results
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.data);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
        <p className="text-lg text-gray-600 mt-2">AI will analyze, categorize, and check for risks automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Upload Area */}
        <div className="space-y-6">
          <Card 
            className={`p-12 text-center border-2 border-dashed transition-colors cursor-pointer ${file ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect}
              accept=".txt,.md,.json" // Restrict to text for this demo
            />
            
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {uploading ? (
                <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
              ) : (
                <Upload className="w-10 h-10 text-teal-600" />
              )}
            </div>
            
            <h3 className="text-xl font-medium text-gray-900">
              {file ? file.name : "Click to select a file"}
            </h3>
            <p className="text-gray-500 mt-2">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : "Supports TXT, MD (PDF requires pdf-parse)"}
            </p>
          </Card>

          <Button 
            className="w-full h-12 text-lg" 
            disabled={!file || uploading} 
            onClick={handleUpload}
          >
            {uploading ? "Processing with AI..." : "Process Document"}
          </Button>
        </div>

        {/* Right: AI Analysis Results */}
        {result && (
          <Card className="p-6 space-y-6 bg-white border-teal-200 shadow-md">
            <div className="flex items-center gap-2 text-teal-700 mb-4">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold text-lg">AI Analysis Complete</span>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Category</span>
              <div className="mt-1">
                <Badge variant="teal" className="text-lg px-4 py-1">{result.category}</Badge>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Risk Level</span>
              <div className="mt-1">
                <Badge variant={result.riskLevel === 'High' ? 'critical' : 'success'}>
                  {result.riskLevel}
                </Badge>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">AI Summary</span>
              <p className="mt-2 text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Identified Themes</span>
              <div className="flex flex-wrap gap-2 mt-2">

{Array.isArray(result.themes) ? result.themes.map((theme: string) => (
   <Badge key={theme} variant="default">{theme}</Badge>
)) : (
   // Fallback in case it actually IS a string (safety check)
   String(result.themes).split(", ").map((theme: string) => (
      <Badge key={theme} variant="default">{theme}</Badge>
   ))
)}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};