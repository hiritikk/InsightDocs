import { Document, AnalyticsMetric } from './types';

export const MOCK_DOCS: Document[] = [
  { 
    id: 1, 
    name: 'Budget Report Q4 2025.pdf', 
    category: 'Finance', 
    tags: ['APPROVED', 'FY2025'], 
    date: 'Nov 29, 2025', 
    status: 'approved', 
    risk: 'low', 
    source: 'Upload',
    summary: 'Quarterly budget overview showing 12% reduction in opex.'
  },
  { 
    id: 2, 
    name: 'HR Policy Draft.docx', 
    category: 'HR', 
    tags: ['DRAFT', 'PII-DETECTED'], 
    date: 'Nov 28, 2025', 
    status: 'pending_approval', 
    risk: 'critical', 
    source: 'SharePoint',
    summary: 'Draft policy regarding remote work updates. Contains employee SSNs.'
  },
  { 
    id: 3, 
    name: 'Vendor Contract - Acme Corp.pdf', 
    category: 'Legal', 
    tags: ['URGENT', 'RENEWAL'], 
    date: 'Nov 28, 2025', 
    status: 'pending_approval', 
    risk: 'medium', 
    source: 'Outlook',
    summary: 'Standard service agreement renewal for IT services.'
  },
  { 
    id: 4, 
    name: 'Security Audit.pdf', 
    category: 'Compliance', 
    tags: ['CONFIDENTIAL', 'INTERNAL'], 
    date: 'Nov 27, 2025', 
    status: 'active', 
    risk: 'low', 
    source: 'Upload',
    summary: 'Annual security audit results passing all major compliance checks.'
  },
  { 
    id: 5, 
    name: 'Invoice #4022.pdf', 
    category: 'Finance', 
    tags: ['PENDING'], 
    date: 'Nov 26, 2025', 
    status: 'active', 
    risk: 'high', 
    source: 'Outlook',
    summary: 'Unusually high amount invoice from unknown vendor.'
  },
];

export const MOCK_ANALYTICS: AnalyticsMetric[] = [
  { name: 'Week 1', approvals: 12, risks: 2 },
  { name: 'Week 2', approvals: 19, risks: 5 },
  { name: 'Week 3', approvals: 15, risks: 1 },
  { name: 'Week 4', approvals: 25, risks: 8 },
];