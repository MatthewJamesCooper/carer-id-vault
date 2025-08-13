import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Bell, User, LogOut, Loader2, Upload, CreditCard } from "lucide-react";
import DocumentList from "@/components/DocumentList";
import DocumentUpload from "@/components/DocumentUpload";
import StatusOverview from "@/components/StatusOverview";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import ShareAccess from "@/components/ShareAccess";
import Payment from "@/components/Payment";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useDocuments } from "@/hooks/useDocuments";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const { documents, userDocuments, loading: documentsLoading } = useDocuments();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile && !profile.onboarding_completed) {
      navigate('/onboarding');
      return;
    }
  }, [user, profile, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAvailabilityChange = (newAvailability: any[]) => {
    console.log('Availability updated:', newAvailability);
  };

  if (loading || documentsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  // Calculate document completion stats
  const totalDocuments = documents.length;
  const completedDocuments = userDocuments.filter(doc => doc.status === 'complete').length;
  const progressPercentage = totalDocuments > 0 ? Math.round((completedDocuments / totalDocuments) * 100) : 0;

  // Mock document data for components that expect the old format
  const mockDocumentsData = documents.map(doc => {
    const userDoc = userDocuments.find(ud => ud.document_id === doc.id);
    return {
      id: parseInt(doc.id),
      name: doc.name,
      status: userDoc?.status || 'missing' as const,
      expiry: userDoc?.expires_at || null,
      required: doc.required,
      thumbnail: userDoc?.file_path ? '/placeholder.svg' : undefined
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/lovable-uploads/36a765b5-70dd-4a00-a597-a7a913b3d39d.png" alt="VerifiedCarer Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VerifiedCarer</h1>
                <p className="text-sm text-gray-600">Document Management for Care Workers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {completedDocuments}/{totalDocuments} Complete
              </Badge>
              <div className="flex items-center space-x-3">
                {profile.profile_photo ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-200">
                    <img src={profile.profile_photo} alt="User profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {profile.first_name || 'User'}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile.first_name || 'User'}!
          </h2>
          <p className="text-gray-600">
            {profile.user_type === 'carer' ? 'Care Professional' : 'Care Agency'} Dashboard
          </p>
        </div>

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
                <div className="text-2xl font-bold text-green-600">{completedDocuments}</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {userDocuments.filter(doc => doc.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {userDocuments.filter(doc => doc.status === 'expiring').length}
                </div>
                <div className="text-sm text-gray-600">Expiring Soon</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {documents.length - userDocuments.length}
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
                { id: 'payment', label: 'Subscription', icon: CreditCard },
                { id: 'share', label: 'Share Access', icon: User }
              ].map(tab => (
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
            <StatusOverview documents={mockDocumentsData} />
            <DocumentList documents={mockDocumentsData} />
          </div>
        )}

        {activeTab === 'upload' && (
          <DocumentUpload userPhoto={profile.profile_photo} setUserPhoto={() => {}} />
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Manage Your Availability</h3>
                <p className="text-gray-600">Set your working hours to help agencies find the perfect match for their care positions.</p>
              </div>
              <AvailabilityCalendar onAvailabilityChange={handleAvailabilityChange} />
            </Card>
          </div>
        )}

        {activeTab === 'payment' && <Payment />}

        {activeTab === 'share' && <ShareAccess documents={mockDocumentsData} />}
      </div>
    </div>
  );
};

export default Index;