import React from 'react';
import { Search } from 'lucide-react';
import { Card, Button } from '@/app/components/shared';

export const SearchView = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Search Documents</h1>
      <p className="text-lg text-gray-600 mt-2">Find what you need using natural language.</p>
    </div>

    <div className="flex gap-4">
      <input 
        type="text" 
        placeholder="e.g., 'Find the budget report from last November'"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
      <Button>
        <Search className="w-5 h-5 mr-2" />
        Search
      </Button>
    </div>

    <div className="text-center py-12 text-gray-500">
      Start typing to search your 1,247 documents...
    </div>
  </div>
);