import React from 'react';
import { ShieldAlert, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';
import { Card } from '@/app/components/shared';
import { MOCK_ANALYTICS } from '@/app/lib/ai/data';

export const AnalyticsView = () => {
  // Mock data for the Risk Distribution chart
  const riskData = [
    { name: 'PII Exposure', count: 12 },
    { name: 'Missing Sig', count: 8 },
    { name: 'Retention', count: 24 },
    { name: 'Budget', count: 5 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Intelligence & Analytics</h1>
        <p className="text-lg text-gray-600 mt-2">
          Real-time insights into compliance risks, workflow bottlenecks, and AI performance.
        </p>
      </div>

      {/* 1. Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-red-800">Critical Risks</p>
              <h3 className="text-3xl font-bold text-red-900 mt-2">3</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-red-700 mt-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            PII exposure detected in 2 docs
          </p>
        </Card>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-800">Avg. Approval Time</p>
              <h3 className="text-3xl font-bold text-blue-900 mt-2">2.4 Days</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-blue-700 mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            ↓ 15% faster than last month
          </p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-green-800">AI Model Accuracy</p>
              <h3 className="text-3xl font-bold text-green-900 mt-2">98.5%</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-700 mt-4">
            Based on last 1,000 categorizations
          </p>
        </Card>
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart A: Workflow Volume */}
        <Card className="p-6 flex flex-col h-96">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Workflow Trends (Last 30 Days)</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_ANALYTICS} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  itemStyle={{ fontSize: '14px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="approvals" 
                  name="Documents Approved"
                  stroke="#0d9488" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0d9488' }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="risks" 
                  name="Risks Flagged"
                  stroke="#dc2626" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#dc2626' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart B: Risk Breakdown */}
        <Card className="p-6 flex flex-col h-96">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Risks by Type</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#374151', fontSize: 14, fontWeight: 500 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Bar 
                  dataKey="count" 
                  name="Incidents"
                  fill="#f59e0b" 
                  radius={[0, 4, 4, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
};
