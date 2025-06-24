
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Clock, FileX } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  status: 'complete' | 'pending' | 'expiring' | 'missing';
  expiry: string | null;
  required: boolean;
}

interface StatusOverviewProps {
  documents: Document[];
}

const StatusOverview = ({ documents }: StatusOverviewProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'expiring':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'missing':
        return <FileX className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      complete: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      expiring: 'bg-orange-100 text-orange-800',
      missing: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const urgentDocuments = documents.filter(doc => 
    doc.status === 'missing' || doc.status === 'expiring'
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Urgent Actions */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Urgent Actions Required</h3>
        </div>
        
        {urgentDocuments.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">All documents are up to date!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {urgentDocuments.slice(0, 5).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <span className="ml-3 font-medium text-gray-900">{doc.name}</span>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            ))}
            {urgentDocuments.length > 5 && (
              <p className="text-sm text-gray-600 text-center">
                +{urgentDocuments.length - 5} more items require attention
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="ml-3 text-sm">CV uploaded successfully</span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="ml-3 text-sm">Medical questionnaire started</span>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="ml-3 text-sm">Driving licence expires in 2 weeks</span>
            </div>
            <span className="text-xs text-gray-500">3 days ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatusOverview;
