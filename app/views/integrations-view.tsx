import React from 'react';
import { Share2, Mail, RefreshCw, Folder } from 'lucide-react';
import { Card, Badge, Button } from '@/app/components/shared';

export const IntegrationsView = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
      <p className="text-lg text-gray-600 mt-2">Connect to legacy systems and external sources.</p>
    </div>

    <div className="grid grid-cols-1 gap-6">
      <Card className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Share2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">SharePoint Online</h3>
            <p className="text-sm text-gray-500">Last synced: 15 mins ago • 1,240 documents</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Badge variant="success">Connected</Badge>
            <Button variant="outline" size="small"><RefreshCw className="w-4 h-4 mr-2"/> Sync Now</Button>
        </div>
      </Card>

      <Card className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Microsoft Outlook</h3>
            <p className="text-sm text-gray-500">Auto-ingest from: invoices@agency.gov</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Badge variant="success">Connected</Badge>
            <Button variant="outline" size="small">Config</Button>
        </div>
      </Card>
      
      <Card className="p-6 flex items-center justify-between opacity-75 grayscale">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Folder className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Legacy FileNET</h3>
            <p className="text-sm text-gray-500">On-premise connector required</p>
          </div>
        </div>
         <Button variant="secondary" size="small">Connect</Button>
      </Card>
    </div>
  </div>
);