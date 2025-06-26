import React from 'react';
import { User, Users } from 'lucide-react';
interface UserTypeSelectionProps {
  userType: 'carer' | 'agency' | null;
  onUserTypeChange: (type: 'carer' | 'agency') => void;
}
const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  userType,
  onUserTypeChange
}) => {
  return <div className="text-center space-y-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-slate-50">
        <img src="/lovable-uploads/ade1a042-5660-4fae-aac5-3e8ccc6094fa.png" alt="CarerPassport Logo" className="w-8 h-8 object-contain" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CarerPassport</h2>
        <p className="text-gray-600">Let's get you set up in just a few minutes</p>
      </div>
      <div className="space-y-4">
        <div onClick={() => onUserTypeChange('carer')} className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${userType === 'carer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold">I'm a Care Professional</h3>
              <p className="text-sm text-gray-600">Manage my documents and credentials</p>
            </div>
          </div>
        </div>
        <div onClick={() => onUserTypeChange('agency')} className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${userType === 'agency' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold">I'm from a Care Agency</h3>
              <p className="text-sm text-gray-600">Verify and manage candidate credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default UserTypeSelection;