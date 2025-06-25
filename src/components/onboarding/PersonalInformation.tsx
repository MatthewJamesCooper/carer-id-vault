
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface PersonalInformationProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  onFormDataChange: (data: Partial<PersonalInformationProps['formData']>) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  formData,
  onFormDataChange
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onFormDataChange({ firstName: e.target.value })}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onFormDataChange({ lastName: e.target.value })}
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFormDataChange({ email: e.target.value })}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onFormDataChange({ phone: e.target.value })}
            placeholder="Enter your phone number"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onFormDataChange({ location: e.target.value })}
            placeholder="City, Region"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
