import React from 'react';
import { 
  Loader2, 
  FileText, 
  Home, 
  BarChart3, 
  GitPullRequest, 
  Share2, 
  Upload, 
  Search, 
  Settings 
} from 'lucide-react';
import { NavItem } from '@/app/lib/types';

// ==========================================
// 1. CARD COMPONENT
// ==========================================
export const Card = ({ 
  children, 
  className = '', 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// ==========================================
// 2. BADGE COMPONENT
// ==========================================
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'teal' | 'critical';

export const Badge = ({ 
  children, 
  variant = 'default', 
  className = '' 
}: { 
  children: React.ReactNode, 
  variant?: BadgeVariant, 
  className?: string 
}) => {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    teal: 'bg-teal-100 text-teal-800',
    critical: 'bg-red-600 text-white font-bold animate-pulse'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ==========================================
// 3. BUTTON COMPONENT
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'default';
  loading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default', 
  disabled, 
  loading, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  
  const sizes = {
    small: "px-4 py-2 text-sm min-h-10",
    default: "px-6 py-3 text-base min-h-12",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={disabled || loading} 
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

// ==========================================
// 4. SIDEBAR COMPONENT
// ==========================================
export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'approvals', label: 'Approvals', icon: GitPullRequest },
  { id: 'integrations', label: 'Integrations', icon: Share2 },
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => (
  <aside className="w-72 bg-white border-r border-gray-200 hidden lg:block fixed h-full z-10">
    <div className="p-6 border-b border-gray-200 flex items-center gap-3">
      <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
        <FileText className="text-white" />
      </div>
      <span className="text-xl font-bold">DocManager</span>
    </div>
    <nav className="p-4 space-y-2">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
            currentPage === item.id ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);