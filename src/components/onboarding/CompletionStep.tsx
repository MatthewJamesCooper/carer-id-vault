
import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletionStep: React.FC = () => {
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
};

export default CompletionStep;
