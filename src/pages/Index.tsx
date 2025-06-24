import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle, CheckCircle, Upload, Calendar, User } from 'lucide-react';
import DocumentUpload from '@/components/DocumentUpload';
import StatusOverview from '@/components/StatusOverview';
import DocumentList from '@/components/DocumentList';
import ShareAccess from '@/components/ShareAccess';
import { useState } from 'react';

interface Document {
  id: number;
  name: string;
  status: 'complete' | 'pending' | 'expiring' | 'missing';
  expiry: string | null;
  required: boolean;
  thumbnail?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Add sample thumbnails for complete documents
  const documentsData: Document[] = [
    { 
      id: 1, 
      name: 'CV', 
      status: 'complete', 
      expiry: null, 
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop'
    },
    { id: 2, name: 'Medical Questionnaire', status: 'pending', expiry: '2024-12-31', required: true },
    { 
      id: 3, 
      name: 'Availability Schedule', 
      status: 'complete', 
      expiry: null, 
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop'
    },
    { id: 4, name: 'Proof of ID', status: 'expiring', expiry: '2024-07-15', required: true },
    { id: 5, name: 'Proof of Address #1', status: 'missing', expiry: null, required: true },
    { id: 6, name: 'Proof of Address #2', status: 'missing', expiry: null, required: true },
    { 
      id: 7, 
      name: 'National Insurance Proof', 
      status: 'complete', 
      expiry: null, 
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop'
    },
    { id: 8, name: 'Right to Work Document', status: 'pending', expiry: '2024-08-20', required: true },
    { 
      id: 9, 
      name: 'Professional Reference 1', 
      status: 'complete', 
      expiry: null, 
      required: true,
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=200&h=200&fit=crop'
    },
    { id: 10, name: 'Professional Reference 2', status: 'missing', expiry: null, required: true },
    { id: 11, name: 'Care Certificate', status: 'complete', expiry: '2025-03-15', required: false },
    { id: 12, name: 'Driving Licence', status: 'expiring', expiry: '2024-07-01', required: true },
    { id: 13, name: 'Driving Licence Points Check', status: 'missing', expiry: null, required: true },
    { id: 14, name: 'CB1 Car Insurance', status: 'pending', expiry: '2024-09-10', required: true },
    { id: 15, name: 'MOT Certificate', status: 'complete', expiry: '2025-01-20', required: true }
  ];

  const completedCount = documentsData.filter(doc => doc.status === 'complete').length;
  const totalCount = documentsData.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/05225979-22df-40a3-ae92-ef3680de52e6.png" 
                  alt="CarerPassport Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CarerPassport</h1>
                <p className="text-sm text-gray-600">Document Management for Care Workers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {completedCount}/{totalCount} Complete
              </Badge>
              <div className="flex items-center space-x-3">
                {userPhoto ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-200">
                    <img 
                      src={userPhoto} 
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                <Button size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Documentation Progress</h2>
              <span className="text-2xl font-bold text-blue-600">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {documentsData.filter(doc => doc.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {documentsData.filter(doc => doc.status === 'expiring').length}
                </div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {documentsData.filter(doc => doc.status === 'missing').length}
                </div>
                <div className="text-sm text-gray-600">Missing</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'upload', label: 'Upload Documents', icon: Upload },
                { id: 'schedule', label: 'Availability', icon: Calendar },
                { id: 'share', label: 'Share Access', icon: User }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <StatusOverview documents={documentsData} />
            <DocumentList documents={documentsData} />
          </div>
        )}

        {activeTab === 'upload' && (
          <DocumentUpload userPhoto={userPhoto} setUserPhoto={setUserPhoto} />
        )}

        {activeTab === 'schedule' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Set Your Availability</h3>
            <p className="text-gray-600 mb-4">Configure your working days and hours to help agencies find the perfect match.</p>
            <Button>Configure Availability</Button>
          </Card>
        )}

        {activeTab === 'share' && (
          <ShareAccess documents={documentsData} />
        )}
      </div>
    </div>
  );
};

export default Index;
