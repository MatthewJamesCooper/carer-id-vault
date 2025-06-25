
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OnboardingHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default OnboardingHeader;
