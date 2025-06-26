
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verificationManager } from '@/services/verification/VerificationManager';
import { VerificationResult } from '@/services/verification/BaseVerificationService';
import VerificationStatus from './VerificationStatus';
import { CheckCircle } from 'lucide-react';

interface RightToWorkVerificationProps {
  onVerificationComplete: (result: VerificationResult) => void;
}

const RightToWorkVerification: React.FC<RightToWorkVerificationProps> = ({ onVerificationComplete }) => {
  const [shareCode, setShareCode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!shareCode || !dateOfBirth) return;

    setIsVerifying(true);
    try {
      const result = await verificationManager.verifyDocument('Right to Work Document', {
        documentType: 'Right to Work Document',
        documentData: { shareCode, dateOfBirth },
        userDetails: { firstName: '', lastName: '' }
      });

      setVerificationResult(result);
      onVerificationComplete(result);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Right to Work Verification</h3>
        </div>
        
        <p className="text-sm text-gray-600">
          Enter your share code from the Home Office to verify your right to work in the UK.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="share-code">Share Code</Label>
            <Input
              id="share-code"
              placeholder="Enter your share code"
              value={shareCode}
              onChange={(e) => setShareCode(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            onClick={handleVerify}
            disabled={!shareCode || !dateOfBirth || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Right to Work'}
          </Button>
          
          <VerificationStatus result={verificationResult} isLoading={isVerifying} />
        </div>

        {verificationResult?.data && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Verification Details</h4>
            <div className="text-sm space-y-1">
              <p><strong>Visa Type:</strong> {verificationResult.data.visaType}</p>
              <p><strong>Work Restrictions:</strong> {verificationResult.data.workRestrictions}</p>
              <p><strong>Employer:</strong> {verificationResult.data.employer}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RightToWorkVerification;
