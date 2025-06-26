
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, Search, Filter, Eye, Calendar, CheckCircle, AlertTriangle, Clock, User, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

interface SharedProfile {
  id: string;
  carerName: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto?: string;
  sharedDate: string;
  accessCode: string;
  completionPercentage: number;
  totalDocuments: number;
  completeDocuments: number;
  expiringDocuments: number;
  missingDocuments: number;
  specializations: string[];
  experience: string;
  availability: string;
}

const AgencyPortal = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock shared profiles data
  const sharedProfiles: SharedProfile[] = [
    {
      id: '1',
      carerName: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '07123 456789',
      location: 'Manchester',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      sharedDate: '2024-06-20',
      accessCode: 'CP-ABC123',
      completionPercentage: 95,
      totalDocuments: 15,
      completeDocuments: 14,
      expiringDocuments: 1,
      missingDocuments: 0,
      specializations: ['Dementia Care', 'Personal Care'],
      experience: '5+ years',
      availability: 'Full-time'
    },
    {
      id: '2',
      carerName: 'David Chen',
      email: 'david.chen@email.com',
      phone: '07987 654321',
      location: 'Birmingham',
      sharedDate: '2024-06-22',
      accessCode: 'CP-XYZ789',
      completionPercentage: 78,
      totalDocuments: 15,
      completeDocuments: 11,
      expiringDocuments: 2,
      missingDocuments: 2,
      specializations: ['End of Life Care', 'Mobility Support'],
      experience: '3+ years',
      availability: 'Part-time'
    },
    {
      id: '3',
      carerName: 'Emma Thompson',
      email: 'emma.thompson@email.com',
      phone: '07555 123456',
      location: 'London',
      profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      sharedDate: '2024-06-25',
      accessCode: 'CP-DEF456',
      completionPercentage: 100,
      totalDocuments: 15,
      completeDocuments: 15,
      expiringDocuments: 0,
      missingDocuments: 0,
      specializations: ['Learning Disabilities', 'Mental Health Support'],
      experience: '8+ years',
      availability: 'Full-time'
    }
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const exportToExcel = () => {
    const exportData = filteredProfiles.map(profile => ({
      'Carer Name': profile.carerName,
      'Email': profile.email,
      'Phone': profile.phone,
      'Location': profile.location,
      'Experience': profile.experience,
      'Availability': profile.availability,
      'Specializations': profile.specializations.join(', '),
      'Shared Date': new Date(profile.sharedDate).toLocaleDateString('en-GB'),
      'Access Code': profile.accessCode,
      'Completion %': profile.completionPercentage,
      'Complete Documents': profile.completeDocuments,
      'Expiring Documents': profile.expiringDocuments,
      'Missing Documents': profile.missingDocuments,
      'Total Documents': profile.totalDocuments,
      'Status': profile.completionPercentage === 100 ? 'Complete' : 
               profile.completionPercentage >= 80 ? 'Nearly Complete' : 'Incomplete'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Carer Profiles');
    
    // Auto-size columns
    const colWidths = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, 15)
    }));
    worksheet['!cols'] = colWidths;
    
    XLSX.writeFile(workbook, `carer-profiles-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToCSV = () => {
    const exportData = filteredProfiles.map(profile => ({
      'Carer Name': profile.carerName,
      'Email': profile.email,
      'Phone': profile.phone,
      'Location': profile.location,
      'Experience': profile.experience,
      'Availability': profile.availability,
      'Specializations': profile.specializations.join(', '),
      'Shared Date': new Date(profile.sharedDate).toLocaleDateString('en-GB'),
      'Access Code': profile.accessCode,
      'Completion %': profile.completionPercentage,
      'Complete Documents': profile.completeDocuments,
      'Expiring Documents': profile.expiringDocuments,
      'Missing Documents': profile.missingDocuments,
      'Total Documents': profile.totalDocuments,
      'Status': profile.completionPercentage === 100 ? 'Complete' : 
               profile.completionPercentage >= 80 ? 'Nearly Complete' : 'Incomplete'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `carer-profiles-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProfiles = sharedProfiles.filter(profile => {
    const matchesSearch = profile.carerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'complete') return matchesSearch && profile.completionPercentage === 100;
    if (filterStatus === 'incomplete') return matchesSearch && profile.completionPercentage < 100;
    
    return matchesSearch;
  });

  const getStatusColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage === 100) return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
    if (percentage >= 80) return <Badge className="bg-yellow-100 text-yellow-800">Nearly Complete</Badge>;
    return <Badge className="bg-red-100 text-red-800">Incomplete</Badge>;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/36a765b5-70dd-4a00-a597-a7a913b3d39d.png" 
                    alt="VerifiedCarer Logo" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">VerifiedCarer</h1>
                  <p className="text-sm text-gray-600">Agency Portal</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Agency Login</h2>
              <p className="text-gray-600 mt-2">Access shared carer profiles and documentation</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="agency-email">Agency Email</Label>
                <Input
                  id="agency-email"
                  type="email"
                  placeholder="agency@example.com"
                />
              </div>
              <div>
                <Label htmlFor="agency-password">Password</Label>
                <Input
                  id="agency-password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Sign In to Portal
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an agency account?{' '}
                <button className="text-blue-600 hover:underline">
                  Contact us to get started
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/36a765b5-70dd-4a00-a597-a7a913b3d39d.png" 
                  alt="VerifiedCarer Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VerifiedCarer</h1>
                <p className="text-sm text-gray-600">Agency Portal - Care Plus Agency</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {sharedProfiles.length} Shared Profiles
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(false)}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shared Carer Profiles</h2>
            <div className="flex gap-2">
              <Button onClick={exportToExcel} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{sharedProfiles.length}</div>
              <div className="text-sm text-gray-600">Total Profiles</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {sharedProfiles.filter(p => p.completionPercentage === 100).length}
              </div>
              <div className="text-sm text-gray-600">Complete Profiles</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {sharedProfiles.filter(p => p.completionPercentage >= 80 && p.completionPercentage < 100).length}
              </div>
              <div className="text-sm text-gray-600">Nearly Complete</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600">
                {sharedProfiles.filter(p => p.completionPercentage < 80).length}
              </div>
              <div className="text-sm text-gray-600">Needs Attention</div>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, location, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'complete' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('complete')}
              size="sm"
            >
              Complete
            </Button>
            <Button
              variant={filterStatus === 'incomplete' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('incomplete')}
              size="sm"
            >
              Incomplete
            </Button>
          </div>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    {profile.profilePhoto ? (
                      <AvatarImage src={profile.profilePhoto} alt={profile.carerName} />
                    ) : (
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{profile.carerName}</h3>
                    <p className="text-sm text-gray-600">{profile.location} • {profile.experience}</p>
                  </div>
                </div>
                {getStatusBadge(profile.completionPercentage)}
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className={`text-sm font-bold ${getStatusColor(profile.completionPercentage)}`}>
                    {profile.completionPercentage}%
                  </span>
                </div>
                <Progress value={profile.completionPercentage} className="h-2 mb-3" />
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-green-600">{profile.completeDocuments}</div>
                    <div className="text-gray-500">Complete</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-600">{profile.expiringDocuments}</div>
                    <div className="text-gray-500">Expiring</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-600">{profile.missingDocuments}</div>
                    <div className="text-gray-500">Missing</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Shared: {new Date(profile.sharedDate).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex items-center">
                  <span>Code: </span>
                  <code className="font-mono text-blue-600 ml-1">{profile.accessCode}</code>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Profile
                </Button>
                <Button size="sm" variant="outline">
                  Contact Carer
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyPortal;
