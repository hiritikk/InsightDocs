import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/app/components/shared';
import { MOCK_DOCS } from '@/app/lib/ai/data';

export const ApprovalsView = () => {
  // Filter mock docs to show only those pending approval
  const [approvals, setApprovals] = useState(
    MOCK_DOCS.filter(d => d.status === 'pending_approval')
  );

  // Simulate approving a document (removes it from the list)
  const handleApprove = (id: number) => {
    setApprovals(prev => prev.filter(d => d.id !== id));
    console.log(`Document ${id} approved`);
  };

  // Simulate rejecting a document
  const handleReject = (id: number) => {
    setApprovals(prev => prev.filter(d => d.id !== id));
    console.log(`Document ${id} rejected`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Approvals Queue</h1>
        <p className="text-lg text-gray-600 mt-2">Manage document workflows and sign-offs.</p>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-bold text-sm text-gray-900">Document</th>
              <th className="px-6 py-4 text-left font-bold text-sm text-gray-900">Date</th>
              <th className="px-6 py-4 text-left font-bold text-sm text-gray-900">Risk Assessment</th>
              <th className="px-6 py-4 text-right font-bold text-sm text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {approvals.map(doc => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 block">{doc.name}</span>
                      <span className="text-xs text-gray-500">{doc.category}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{doc.date}</td>
                <td className="px-6 py-4">
                  <Badge variant={doc.risk === 'critical' ? 'critical' : 'success'}>
                    {doc.risk === 'critical' ? 'CRITICAL RISK' : 'SAFE'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button 
                    size="small" 
                    variant="danger" 
                    onClick={() => handleReject(doc.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    size="small" 
                    variant="primary" 
                    onClick={() => handleApprove(doc.id)}
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
            
            {approvals.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                    <p className="text-lg font-medium text-gray-900">All caught up!</p>
                    <p className="text-sm">No documents pending approval.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};