
import React from 'react';
import { Label } from '@/components/ui/label';

interface ProfessionalBackgroundProps {
  formData: {
    experience: string;
    specializations: string[];
  };
  onFormDataChange: (data: Partial<ProfessionalBackgroundProps['formData']>) => void;
}

const ProfessionalBackground: React.FC<ProfessionalBackgroundProps> = ({
  formData,
  onFormDataChange
}) => {
  const specializations = [
    'Dementia Care', 'Learning Disabilities', 'Mental Health', 'Palliative Care',
    'Elderly Care', 'Physical Disabilities', 'Autism Support', 'Complex Care'
  ];

  const handleSpecializationToggle = (specialization: string) => {
    const newSpecializations = formData.specializations.includes(specialization)
      ? formData.specializations.filter(s => s !== specialization)
      : [...formData.specializations, specialization];
    
    onFormDataChange({ specializations: newSpecializations });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Background</h2>
        <p className="text-gray-600">Help us understand your experience</p>
      </div>
      <div>
        <Label htmlFor="experience">Years of Experience</Label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={formData.experience}
          onChange={(e) => onFormDataChange({ experience: e.target.value })}
        >
          <option value="">Select experience level</option>
          <option value="new">New to care (0-1 years)</option>
          <option value="experienced">Experienced (1-5 years)</option>
          <option value="senior">Senior (5+ years)</option>
        </select>
      </div>
      <div>
        <Label>Areas of Specialization</Label>
        <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
        <div className="grid grid-cols-2 gap-2">
          {specializations.map((spec) => (
            <div
              key={spec}
              onClick={() => handleSpecializationToggle(spec)}
              className={`p-2 text-sm border rounded-lg cursor-pointer transition-colors ${
                formData.specializations.includes(spec)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {spec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBackground;
