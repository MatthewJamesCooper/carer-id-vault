import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, AlertTriangle, Image, User } from 'lucide-react';
import { verificationManager } from '@/services/verification/VerificationManager';
import { VerificationResult } from '@/services/verification/BaseVerificationService';
import RightToWorkVerification from '@/components/verification/RightToWorkVerification';
import DrivingLicenceVerification from '@/components/verification/DrivingLicenceVerification';
import VerificationStatus from '@/components/verification/VerificationStatus';

interface DocumentUploadProps {
  userPhoto: string | null;
  setUserPhoto: (photo: string | null) => void;
}

const DocumentUpload = ({ userPhoto, setUserPhoto }: DocumentUploadProps) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [photoDragActive, setPhotoDragActive] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const documentTypes = [
    'CV',
    'Medical Questionnaire',
    'Proof of ID',
    'Proof of Address #1',
    'Proof of Address #2',
    'National Insurance Proof',
    'Right to Work Document',
    'Professional Reference 1',
    'Professional Reference 2',
    'Care Certificate',
    'Driving Licence',
    'Driving Licence Points Check',
    'CB1 Car Insurance',
    'MOT Certificate'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handlePhotoDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setPhotoDragActive(true);
    } else if (e.type === 'dragleave') {
      setPhotoDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    console.log('Files uploaded:', files);
    
    // Check if verification is required for this document type
    if (verificationManager.isVerificationRequired(selectedDocumentType)) {
      setShowVerification(true);
    }
  };

  const handlePhotoFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUserPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationComplete = (result: VerificationResult) => {
    setVerificationResult(result);
    console.log('Verification completed:', result);
  };

  const handleDocumentTypeChange = (value: string) => {
    setSelectedDocumentType(value);
    setVerificationResult(null);
    setShowVerification(false);
  };

  const renderVerificationComponent = () => {
    if (!showVerification || !verificationManager.isVerificationRequired(selectedDocumentType)) {
      return null;
    }

    switch (selectedDocumentType) {
      case 'Right to Work Document':
        return <RightToWorkVerification onVerificationComplete={handleVerificationComplete} />;
      case 'Driving Licence':
      case 'Driving Licence Points Check':
        return <DrivingLicenceVerification onVerificationComplete={handleVerificationComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* User Photo Upload */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Your Photo</h3>
        <p className="text-gray-600 mb-4">
          Add a professional photo that will be displayed on your profile and shared with employers.
        </p>
        
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {userPhoto ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200">
                <img 
                  src={userPhoto} 
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                photoDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handlePhotoDrag}
              onDragLeave={handlePhotoDrag}
              onDragOver={handlePhotoDrag}
              onDrop={handlePhotoDrop}
            >
              <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drop your photo here or click to browse
              </p>
              <Input
                type="file"
                className="hidden"
                id="photo-upload"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handlePhotoFiles(e.target.files)}
              />
              <Label htmlFor="photo-upload">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Choose Photo
                </Button>
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Document Type Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="document-type">Document Type</Label>
            <Select value={selectedDocumentType} onValueChange={handleDocumentTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                    {verificationManager.isVerificationRequired(type) && (
                      <span className="ml-2 text-xs text-blue-600">(Verifiable)</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedDocumentType && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">Requirements for {selectedDocumentType}</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {getDocumentRequirements(selectedDocumentType)}
                  </p>
                  {verificationManager.isVerificationRequired(selectedDocumentType) && (
                    <p className="text-sm text-green-700 mt-2 font-medium">
                      ✓ This document supports automatic verification
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Verification Component */}
      {renderVerificationComponent()}

      {/* File Upload */}
      {selectedDocumentType && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Upload {selectedDocumentType}</h4>
            {verificationResult && (
              <VerificationStatus result={verificationResult} />
            )}
          </div>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Drop your {selectedDocumentType} here
            </h4>
            <p className="text-gray-600 mb-4">
              or click to browse your files
            </p>
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </Label>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </Card>
      )}

      {/* Expiry Date */}
      {selectedDocumentType && needsExpiryDate(selectedDocumentType) && (
        <Card className="p-6">
          <h4 className="font-medium text-gray-900 mb-4">Document Expiry Date</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input type="date" id="expiry-date" />
            </div>
            <div>
              <Label htmlFor="reminder-days">Reminder (days before expiry)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reminder period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {/* Upload Button */}
      {selectedDocumentType && (
        <div className="flex justify-end">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
};

const getDocumentRequirements = (documentType: string): string => {
  const requirements: { [key: string]: string } = {
    'CV': 'Upload an up-to-date CV with no employment gaps. Our AI will check for gaps and prompt you to update if needed.',
    'Proof of ID': 'Valid passport or birth certificate. If your name has changed, include name change certificate (marriage/deed poll).',
    'Proof of Address #1': 'Utility bill, bank statement, or council tax statement within 3 months. Must show current name and address.',
    'Proof of Address #2': 'Second proof of address document (different from #1). NOT mobile phone bills accepted.',
    'National Insurance Proof': 'National Insurance number document that matches your current name.',
    'Right to Work Document': 'Government check certificate or short code for status verification.',
    'Driving Licence': 'Front and back of UK driving licence. Address must match proof of ID.',
    'CB1 Car Insurance': 'Insurance certificate showing CB1 business use cover (not just commuting).',
    'MOT Certificate': 'Valid MOT certificate with number plate matching your car insurance.'
  };
  
  return requirements[documentType] || 'Please ensure document is clear, valid, and meets all requirements.';
};

const needsExpiryDate = (documentType: string): boolean => {
  const expiryDocuments = [
    'Proof of ID',
    'Right to Work Document',
    'Care Certificate',
    'Driving Licence',
    'CB1 Car Insurance',
    'MOT Certificate'
  ];
  
  return expiryDocuments.includes(documentType);
};

export default DocumentUpload;
