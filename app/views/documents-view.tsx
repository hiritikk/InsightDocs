import React from 'react';
import { Card, Badge, Button } from '@/app/components/shared';
import { MOCK_DOCS } from '@/app/lib/ai/data';

export const DocumentsView = () => (
  <div className="space-y-6">
     <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Documents</h1>
          <p className="text-gray-500">Manage and organize your files.</p>
        </div>
        <Button>Upload New</Button>
     </div>
     <Card className="overflow-hidden">
       <table className="w-full">
         <thead className="bg-gray-50 border-b">
           <tr>
             <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
             <th className="px-6 py-4 text-left font-semibold text-gray-900">Category</th>
             <th className="px-6 py-4 text-left font-semibold text-gray-900">Source</th>
             <th className="px-6 py-4 text-left font-semibold text-gray-900">Risk Level</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
           {MOCK_DOCS.map(doc => (
             <tr key={doc.id} className="hover:bg-gray-50">
               <td className="px-6 py-4 font-medium text-gray-900">{doc.name}</td>
               <td className="px-6 py-4"><Badge variant="teal">{doc.category}</Badge></td>
               <td className="px-6 py-4 text-sm text-gray-500">{doc.source}</td>
               <td className="px-6 py-4">
                  {doc.risk === 'critical' ? <Badge variant="critical">CRITICAL</Badge> : <Badge variant="success">LOW</Badge>}
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </Card>
  </div>
);