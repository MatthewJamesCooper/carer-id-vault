
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  userType: 'carer' | 'agency' | null;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentStep,
  totalSteps,
  userType,
  onPrevious,
  onNext,
  onComplete
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      
      {currentStep === totalSteps ? (
        <Button onClick={onComplete}>
          Complete Setup
          <CheckCircle className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={currentStep === 1 && !userType}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default OnboardingNavigation;
