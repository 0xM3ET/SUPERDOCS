"use client";

import React from 'react';
import { Globe, AlertCircle, Code, ChevronRight } from 'lucide-react';

interface CheckItem {
  label: string;
  status: 'loading' | 'complete' | 'error' | 'pending';
}

interface DashboardCardProps {
  title: string;
  description: string;
  variant: 'default' | 'alert' | 'geo' | 'workflow' | 'code';
}

const StatusIndicator: React.FC<{ status: CheckItem['status'] }> = ({ status }) => {
  const statusColors = {
    loading: 'animate-spin text-blue-500',
    complete: 'text-green-500',
    error: 'text-red-500',
    pending: 'text-gray-400'
  };

  return (
    <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
  );
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, variant }) => {
  const cardStyles = {
    default: 'bg-gray-900',
    alert: 'bg-gradient-to-r from-gray-900 to-red-900/50',
    geo: 'bg-gradient-to-r from-gray-900 to-purple-900/50',
    workflow: 'bg-gray-900',
    code: 'bg-gray-900'
  };

  return (
    <div className={`
      rounded-xl p-6 
      ${cardStyles[variant]} 
      hover:ring-1 hover:ring-gray-700 
      transition-all duration-300 
      relative overflow-hidden
      group
    `}>
      {/* Animated beam effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 transform -skew-x-12" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
          {title}
          <ChevronRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
        </h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

const BusinessVerification: React.FC = () => {
  const checks: CheckItem[] = [
    { label: 'Registry check', status: 'loading' },
    { label: 'Owner check', status: 'error' },
    { label: 'Sanctions check', status: 'complete' },
    { label: 'Address check', status: 'pending' }
  ];

  return (
    <div className="p-4 bg-gray-900 rounded-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">ACME Corp</h2>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 transform transition-transform duration-200 hover:translate-x-1"
            >
              <span className="text-gray-300 text-sm">{check.label}</span>
              <StatusIndicator status={check.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AnimatedBeamMultipleOutputDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BusinessVerification />
        
        <DashboardCard
          title="Stay ahead of regulation"
          description="Leverage new data sources to enhance your fraud prevention processes"
          variant="alert"
        />
        
        <DashboardCard
          title="Launch new GEOs, fast!"
          description="Streamline expansion with simplified workflow creation"
          variant="geo"
        />
        
        <DashboardCard
          title="Keep your ops lean"
          description="Automate your decisions, and optimize your operational workflows to scale"
          variant="workflow"
        />
        
        <DashboardCard
          title="Stay future-proof"
          description="Extend the platform's capabilities by adding custom code, vendors, and more."
          variant="code"
        />
      </div>
    </div>
  );
};