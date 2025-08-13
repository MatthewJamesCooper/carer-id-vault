
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AgencyInformationProps {
  formData: {
    agencyName: string;
    agencySize: string;
    serviceAreas: string;
  };
  onFormDataChange: (data: Partial<AgencyInformationProps['formData']>) => void;
}

const AgencyInformation: React.FC<AgencyInformationProps> = ({
  formData,
  onFormDataChange
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Agency Information</h2>
        <p className="text-gray-600">Tell us about your care agency</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="agencyName">Agency Name</Label>
          <Input 
            id="agencyName" 
            placeholder="Enter your agency name"
            value={formData.agencyName}
            onChange={(e) => onFormDataChange({ agencyName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="agencySize">Number of Care Workers</Label>
          <Input 
            id="agencySize" 
            placeholder="How many care workers do you employ?"
            value={formData.agencySize}
            onChange={(e) => onFormDataChange({ agencySize: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="serviceAreas">Service Areas</Label>
          <Input 
            id="serviceAreas" 
            placeholder="Which areas do you provide care services?"
            value={formData.serviceAreas}
            onChange={(e) => onFormDataChange({ serviceAreas: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default AgencyInformation;
