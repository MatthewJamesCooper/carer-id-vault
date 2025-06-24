
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, Share2, Eye, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: number;
  name: string;
  status: 'complete' | 'pending' | 'expiring' | 'missing';
  expiry: string | null;
  required: boolean;
}

interface ShareAccessProps {
  documents: Document[];
}

interface AccessCode {
  id: string;
  employerName: string;
  code: string;
  expiresAt: string;
  createdAt: string;
  accessed: boolean;
  lastAccessed?: string;
}

const ShareAccess = ({ documents }: ShareAccessProps) => {
  const { toast } = useToast();
  const [employerName, setEmployerName] = useState('');
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([
    {
      id: '1',
      employerName: 'Care Plus Agency',
      code: 'CP-ABC123',
      expiresAt: '2024-07-30',
      createdAt: '2024-06-20',
      accessed: true,
      lastAccessed: '2024-06-22'
    },
    {
      id: '2',
      employerName: 'Home Support Services',
      code: 'HS-XYZ789',
      expiresAt: '2024-07-15',
      createdAt: '2024-06-18',
      accessed: false
    }
  ]);

  const generateAccessCode = () => {
    if (!employerName.trim()) {
      toast({
        title: "Employer name required",
        description: "Please enter the employer's name before generating a code.",
        variant: "destructive"
      });
      return;
    }

    const code = `CD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 14); // 14 days from now

    const newAccessCode: AccessCode = {
      id: Date.now().toString(),
      employerName: employerName.trim(),
      code,
      expiresAt: expiryDate.toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      accessed: false
    };

    setAccessCodes([newAccessCode, ...accessCodes]);
    setEmployerName('');

    toast({
      title: "Access code generated",
      description: `Code ${code} created for ${employerName}`,
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(`View my care documents with code: ${code} at https://carerpassport.app/view`);
    toast({
      title: "Copied to clipboard",
      description: "Share link copied to clipboard",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const completedDocs = documents.filter(doc => doc.status === 'complete').length;
  const totalDocs = documents.length;

  return (
    <div className="space-y-6">
      {/* Document Readiness Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Document Readiness</h3>
          <Badge variant={completedDocs === totalDocs ? "default" : "secondary"} className="bg-blue-100 text-blue-800">
            {completedDocs}/{totalDocs} Ready
          </Badge>
        </div>
        
        {completedDocs < totalDocs ? (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Some documents are incomplete</h4>
                <p className="text-sm text-orange-700 mt-1">
                  You have {totalDocs - completedDocs} documents that need attention. Employers will see which documents are missing or expired.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">All documents ready</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your documentation is complete and ready to share with employers.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Generate New Access Code */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Access Code</h3>
        <p className="text-gray-600 mb-6">
          Create a secure access code that allows potential employers to view your documents for a limited time.
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="employer-name">Employer/Agency Name</Label>
            <Input
              id="employer-name"
              type="text"
              placeholder="e.g. Care Plus Agency"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </div>
          
          <Button onClick={generateAccessCode} className="w-full md:w-auto">
            <Share2 className="w-4 h-4 mr-2" />
            Generate Access Code
          </Button>
        </div>
      </Card>

      {/* Active Access Codes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Access Codes</h3>
        
        {accessCodes.length === 0 ? (
          <div className="text-center py-8">
            <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No access codes generated yet</p>
            <p className="text-sm text-gray-500">Create your first access code above to share with employers</p>
          </div>
        ) : (
          <div className="space-y-4">
            {accessCodes.map((accessCode) => (
              <div
                key={accessCode.id}
                className={`border rounded-lg p-4 ${
                  isExpired(accessCode.expiresAt) ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{accessCode.employerName}</h4>
                      <Badge
                        variant={isExpired(accessCode.expiresAt) ? "destructive" : accessCode.accessed ? "default" : "secondary"}
                        className={
                          isExpired(accessCode.expiresAt)
                            ? "bg-red-100 text-red-800"
                            : accessCode.accessed
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {isExpired(accessCode.expiresAt) ? 'Expired' : accessCode.accessed ? 'Accessed' : 'Pending'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="font-mono font-semibold text-blue-600">{accessCode.code}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(accessCode.code)}
                          className="ml-2 h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>Created: {formatDate(accessCode.createdAt)}</span>
                        <span>Expires: {formatDate(accessCode.expiresAt)}</span>
                        {accessCode.lastAccessed && (
                          <span>Last accessed: {formatDate(accessCode.lastAccessed)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {accessCode.accessed && (
                      <Eye className="w-4 h-4 text-green-500" />
                    )}
                    {isExpired(accessCode.expiresAt) && (
                      <Clock className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* How it Works */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
            <p>Generate a unique access code for each employer or agency</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
            <p>Share the code with potential employers (valid for 14 days)</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
            <p>Employers can view your document status and completion level</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</div>
            <p>You can track when and which employers accessed your information</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShareAccess;
