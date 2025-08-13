import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import PersonalInformation from '@/components/onboarding/PersonalInformation';
import AgencyInformation from '@/components/onboarding/AgencyInformation';
import ProfessionalBackground from '@/components/onboarding/ProfessionalBackground';
import ProfilePhoto from '@/components/onboarding/ProfilePhoto';
import DocumentPriorities from '@/components/onboarding/DocumentPriorities';
import AvailabilityStep from '@/components/onboarding/AvailabilityStep';
import CompletionStep from '@/components/onboarding/CompletionStep';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading: profileLoading, updateProfile, completeOnboarding } = useProfile();
  
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
    agencyName: '',
    agencySize: '',
    serviceAreas: '',
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [availability, setAvailability] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  // Redirect if user is not authenticated or onboarding is already completed
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile && profile.onboarding_completed) {
      navigate('/dashboard');
      return;
    }

    // Initialize form with existing profile data
    if (profile) {
      setUserType(profile.user_type);
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        experience: profile.experience || '',
        specializations: profile.specializations || [],
        agencyName: profile.agency_name || '',
        agencySize: profile.agency_size || '',
        serviceAreas: profile.service_areas || '',
      });
      setProfilePhoto(profile.profile_photo);
      setAvailability(profile.availability || []);
    }
  }, [user, profile, navigate]);

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = async () => {
    // Save current step data before moving to next step
    await saveCurrentStepData();
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveCurrentStepData = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const updates: any = {};

      switch (currentStep) {
        case 1:
          updates.user_type = userType;
          break;
        case 2:
          if (userType === 'carer') {
            updates.first_name = formData.firstName;
            updates.last_name = formData.lastName;
            updates.email = formData.email;
            updates.phone = formData.phone;
            updates.location = formData.location;
          }
          break;
        case 3:
          if (userType === 'agency') {
            updates.agency_name = formData.agencyName;
            updates.agency_size = formData.agencySize;
            updates.service_areas = formData.serviceAreas;
          } else {
            updates.experience = formData.experience;
            updates.specializations = formData.specializations;
          }
          break;
        case 4:
          updates.profile_photo = profilePhoto;
          break;
        case 6:
          updates.availability = availability;
          break;
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(updates);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    await saveCurrentStepData();
    const success = await completeOnboarding();
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePhotoChange = (photo: string) => {
    setProfilePhoto(photo);
  };

  const handleAvailabilityChange = (availability: any[]) => {
    setAvailability(availability);
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
        return userType === 'agency' ? (
          <AgencyInformation 
            formData={{ 
              agencyName: formData.agencyName, 
              agencySize: formData.agencySize, 
              serviceAreas: formData.serviceAreas 
            }}
            onFormDataChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
          />
        ) : (
          <ProfessionalBackground
            formData={{ experience: formData.experience, specializations: formData.specializations }}
            onFormDataChange={handleFormDataChange}
          />
        );

      case 4:
        return (
          <ProfilePhoto
            profilePhoto={profilePhoto}
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
          disabled={saving}
        />
      </div>
    </div>
  );
};

export default Onboarding;