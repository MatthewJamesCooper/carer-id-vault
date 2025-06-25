
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import PersonalInformation from '@/components/onboarding/PersonalInformation';
import AgencyInformation from '@/components/onboarding/AgencyInformation';
import ProfessionalBackground from '@/components/onboarding/ProfessionalBackground';
import ProfilePhoto from '@/components/onboarding/ProfilePhoto';
import DocumentPriorities from '@/components/onboarding/DocumentPriorities';
import AvailabilityStep from '@/components/onboarding/AvailabilityStep';
import CompletionStep from '@/components/onboarding/CompletionStep';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'carer' | 'agency' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    specializations: [] as string[],
    profilePhoto: null as string | null,
    availability: [] as any[]
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // In a real app, this would save the data
    navigate('/dashboard');
  };

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePhotoChange = (photo: string) => {
    setFormData(prev => ({ ...prev, profilePhoto: photo }));
  };

  const handleAvailabilityChange = (availability: any[]) => {
    setFormData(prev => ({ ...prev, availability }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserTypeSelection
            userType={userType}
            onUserTypeChange={setUserType}
          />
        );

      case 2:
        return (
          <PersonalInformation
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        );

      case 3:
        if (userType === 'agency') {
          return <AgencyInformation />;
        }
        
        return (
          <ProfessionalBackground
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        );

      case 4:
        return (
          <ProfilePhoto
            profilePhoto={formData.profilePhoto}
            onPhotoChange={handlePhotoChange}
          />
        );

      case 5:
        return <DocumentPriorities />;

      case 6:
        return (
          <AvailabilityStep
            onAvailabilityChange={handleAvailabilityChange}
          />
        );

      case 7:
        return <CompletionStep />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <OnboardingHeader />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="p-8">
          {renderStep()}
        </Card>

        {/* Navigation */}
        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          userType={userType}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default Onboarding;
