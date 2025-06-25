
import React from 'react';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

interface AvailabilityStepProps {
  onAvailabilityChange: (availability: any[]) => void;
}

const AvailabilityStep: React.FC<AvailabilityStepProps> = ({
  onAvailabilityChange
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Availability</h2>
        <p className="text-gray-600">Choose when you're available to work</p>
      </div>
      <AvailabilityCalendar onAvailabilityChange={onAvailabilityChange} />
    </div>
  );
};

export default AvailabilityStep;
