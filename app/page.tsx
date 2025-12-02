"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ✅ Ensure this points to your shared file
import { Sidebar } from '@/app/components/shared'; 

// ✅ Ensure these point to existing files in app/views/
import { DashboardView } from '@/app/views/dashboard-view';
import { DocumentsView } from '@/app/views/documents-view';
import { AnalyticsView } from '@/app/views/analytics-view';
import { ApprovalsView } from '@/app/views/approvals-view';
import { IntegrationsView } from '@/app/views/integrations-view';
import { UploadView } from '@/app/views/upload-view';
import { SearchView } from '@/app/views/search-view';
import { SettingsView } from '@/app/views/settings-view';

export default function DocManagerApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardView />;
      case 'documents': return <DocumentsView />;
      case 'analytics': return <AnalyticsView />;
      case 'approvals': return <ApprovalsView />;
      case 'integrations': return <IntegrationsView />;
      case 'upload': return <UploadView />;
      case 'search': return <SearchView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <div className="flex min-h-screen">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <div className="flex-1 lg:ml-72 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
             <h2 className="text-xl font-semibold capitalize">{currentPage}</h2>
             <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                 <span className="font-medium">John Doe</span>
                 <span className="text-sm text-gray-500">Admin</span>
               </div>
               <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white">JD</div>
             </div>
          </header>
          <main className="p-8 flex-1 overflow-auto">
             <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderPage()}
                </motion.div>
             </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}