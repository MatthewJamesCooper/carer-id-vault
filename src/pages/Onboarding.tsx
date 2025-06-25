import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Users, ArrowRight, ArrowLeft, Upload, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

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

  const specializations = [
    'Dementia Care', 'Learning Disabilities', 'Mental Health', 'Palliative Care',
    'Elderly Care', 'Physical Disabilities', 'Autism Support', 'Complex Care'
  ];

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

  const handleSpecializationToggle = (specialization: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvailabilityChange = (availability: any[]) => {
    setFormData(prev => ({ ...prev, availability }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <img 
                src="/lovable-uploads/ade1a042-5660-4fae-aac5-3e8ccc6094fa.png" 
                alt="CarerPassport Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CarerPassport</h2>
              <p className="text-gray-600">Let's get you set up in just a few minutes</p>
            </div>
            <div className="space-y-4">
              <div
                onClick={() => setUserType('carer')}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  userType === 'carer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <h3 className="font-semibold">I'm a Care Professional</h3>
                    <p className="text-sm text-gray-600">Manage my documents and credentials</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setUserType('agency')}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  userType === 'agency' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <h3 className="font-semibold">I'm from a Care Agency</h3>
                    <p className="text-sm text-gray-600">Verify and manage candidate credentials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
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
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Region"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        if (userType === 'agency') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Agency Information</h2>
                <p className="text-gray-600">Tell us about your care agency</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agencyName">Agency Name</Label>
                  <Input id="agencyName" placeholder="Enter your agency name" />
                </div>
                <div>
                  <Label htmlFor="agencySize">Number of Care Workers</Label>
                  <Input id="agencySize" placeholder="How many care workers do you employ?" />
                </div>
                <div>
                  <Label htmlFor="serviceAreas">Service Areas</Label>
                  <Input id="serviceAreas" placeholder="Which areas do you provide care services?" />
                </div>
              </div>
            </div>
          );
        }
        
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
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
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

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Photo</h2>
              <p className="text-gray-600">Add a professional photo to your profile</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              {formData.profilePhoto ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200">
                  <img
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Priorities</h2>
              <p className="text-gray-600">Let's identify which documents you need to upload first</p>
            </div>
            <div className="space-y-3">
              {[
                { name: 'CV/Resume', priority: 'High', color: 'red' },
                { name: 'Right to Work Document', priority: 'High', color: 'red' },
                { name: 'Proof of ID', priority: 'High', color: 'red' },
                { name: 'Medical Questionnaire', priority: 'Medium', color: 'yellow' },
                { name: 'Professional References', priority: 'Medium', color: 'yellow' },
                { name: 'Care Certificate', priority: 'Low', color: 'green' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{doc.name}</span>
                  <Badge className={`
                    ${doc.color === 'red' ? 'bg-red-100 text-red-800' :
                      doc.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {doc.priority} Priority
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Availability</h2>
              <p className="text-gray-600">Choose when you're available to work</p>
            </div>
            <AvailabilityCalendar onAvailabilityChange={handleAvailabilityChange} />
          </div>
        );

      case 7:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
              <p className="text-gray-600">Your CarerPassport account is ready to use</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
              <ul className="text-left text-blue-800 space-y-1">
                <li>• Upload your priority documents</li>
                <li>• Complete your availability schedule</li>
                <li>• Start sharing your profile with agencies</li>
                <li>• Set up document expiry reminders</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/ade1a042-5660-4fae-aac5-3e8ccc6094fa.png" 
                  alt="CarerPassport Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CarerPassport</h1>
                <p className="text-sm text-gray-600">Getting Started</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              Exit
            </Button>
          </div>
        </div>
      </header>

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
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button onClick={handleComplete}>
              Complete Setup
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && !userType}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
