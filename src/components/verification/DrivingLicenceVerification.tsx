
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verificationManager } from '@/services/verification/VerificationManager';
import { VerificationResult } from '@/services/verification/BaseVerificationService';
import VerificationStatus from './VerificationStatus';
import { Car } from 'lucide-react';

interface DrivingLicenceVerificationProps {
  onVerificationComplete: (result: VerificationResult) => void;
}

const DrivingLicenceVerification: React.FC<DrivingLicenceVerificationProps> = ({ onVerificationComplete }) => {
  const [licenceNumber, setLicenceNumber] = useState('');
  const [checkCode, setCheckCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!licenceNumber || !checkCode) return;

    setIsVerifying(true);
    try {
      const result = await verificationManager.verifyDocument('Driving Licence', {
        documentType: 'Driving Licence',
        documentData: { licenceNumber, checkCode },
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
          <Car className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Driving Licence Verification</h3>
        </div>
        
        <p className="text-sm text-gray-600">
          Enter your driving licence details to verify with DVLA.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="licence-number">Licence Number</Label>
            <Input
              id="licence-number"
              placeholder="e.g., SMITH123456AB9CD"
              value={licenceNumber}
              onChange={(e) => setLicenceNumber(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <Label htmlFor="check-code">Check Code</Label>
            <Input
              id="check-code"
              placeholder="Last 4 characters"
              maxLength={4}
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            onClick={handleVerify}
            disabled={!licenceNumber || !checkCode || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Driving Licence'}
          </Button>
          
          <VerificationStatus result={verificationResult} isLoading={isVerifying} />
        </div>

        {verificationResult?.data && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Licence Details</h4>
            <div className="text-sm space-y-1">
              <p><strong>Type:</strong> {verificationResult.data.licenceType}</p>
              <p><strong>Categories:</strong> {verificationResult.data.categories.join(', ')}</p>
              <p><strong>Points:</strong> {verificationResult.data.points}</p>
              <p><strong>Address:</strong> {verificationResult.data.address}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DrivingLicenceVerification;
