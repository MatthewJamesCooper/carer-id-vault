
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Upload } from 'lucide-react';

interface ProfilePhotoProps {
  profilePhoto: string | null;
  onPhotoChange: (photo: string) => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  profilePhoto,
  onPhotoChange
}) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onPhotoChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Photo</h2>
        <p className="text-gray-600">Add a professional photo to your profile</p>
      </div>
      <div className="flex flex-col items-center space-y-4">
        {profilePhoto ? (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200">
            <img
              src={profilePhoto}
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
          {profilePhoto ? 'Change Photo' : 'Upload Photo'}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePhoto;
