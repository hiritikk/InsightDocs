import React from 'react';
import { FileText } from 'lucide-react';
import { Card, Badge, Button } from '@/app/components/shared';
import { MOCK_DOCS } from '@/app/lib/ai/data';

export const DashboardView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       <Card className="p-6">
          <p className="text-gray-600">Total Documents</p>
          <p className="text-3xl font-bold mt-2">1,247</p>
       </Card>
       <Card className="p-6 bg-red-50 border-red-200">
          <p className="text-red-800">Critical Risks</p>
          <p className="text-3xl font-bold mt-2 text-red-900">3</p>
       </Card>
       <Card className="p-6">
          <p className="text-gray-600">Pending Approval</p>
          <p className="text-3xl font-bold mt-2">23</p>
       </Card>
       <Card className="p-6">
          <p className="text-gray-600">AI Accuracy</p>
          <p className="text-3xl font-bold mt-2 text-teal-600">94.2%</p>
       </Card>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card className="p-6">
         <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
         <div className="space-y-4">
            {MOCK_DOCS.map(doc => (
               <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                     <FileText className="text-teal-600" />
                     <div>
                       <p className="font-medium">{doc.name}</p>
                       <p className="text-xs text-gray-500">{doc.category}</p>
                     </div>
                  </div>
                  <Badge variant={doc.risk === 'critical' ? 'critical' : 'default'}>{doc.status}</Badge>
               </div>
            ))}
         </div>
       </Card>
       <Card className="p-6 bg-teal-50 border-teal-200">
          <h3 className="font-bold text-lg text-teal-900 mb-2">Phase 2 System Status</h3>
          <ul className="list-disc pl-5 space-y-2 text-teal-800">
             <li>Theme identification engine is online.</li>
             <li>Compliance risk scanning is active (Scanning for SSN, PII).</li>
             <li>SharePoint integration synced 15 minutes ago.</li>
             <li>Workflow routing rules applied for Finance dept.</li>
          </ul>
       </Card>
    </div>
  </div>
);