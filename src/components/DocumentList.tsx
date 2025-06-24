
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle, FileX, Upload, File } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  status: 'complete' | 'pending' | 'expiring' | 'missing';
  expiry: string | null;
  required: boolean;
}

interface DocumentListProps {
  documents: Document[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    const statusOrder = { missing: 0, expiring: 1, pending: 2, complete: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">All Documents</h3>
        <Button size="sm" variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Bulk Upload
        </Button>
      </div>

      <div className="space-y-3">
        {sortedDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(doc.status)}
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  {!doc.required && (
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  )}
                </div>
                {doc.expiry && (
                  <p className="text-sm text-gray-600">
                    Expires: {formatDate(doc.expiry)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {getStatusBadge(doc.status)}
              {doc.status === 'complete' ? (
                <Button size="sm" variant="ghost">
                  <File className="w-4 h-4 mr-2" />
                  View
                </Button>
              ) : (
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DocumentList;
