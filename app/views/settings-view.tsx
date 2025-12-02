import React from 'react';
import { Card, Button } from '@/app/components/shared';

export const SettingsView = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="text-lg text-gray-600 mt-2">Manage your account and preferences.</p>
    </div>

    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
           <input type="text" defaultValue="John" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
           <input type="text" defaultValue="Doe" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
         <input type="email" defaultValue="john.doe@agency.gov" className="w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <Button>Save Changes</Button>
    </Card>
  </div>
);