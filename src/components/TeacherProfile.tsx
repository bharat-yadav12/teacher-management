"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  Camera
} from 'lucide-react';

export function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alyna Allan',
    role: 'Senior Teacher',
    email: 'alyna.allan@example.com',
    phone: '(416) 555-0007',
    birthDate: '1988-03-15',
    address: '123 Maple Street, North York, Ontario, Canada',
    bio: 'Passionate educator with over 10 years of experience in mathematics and science education. Dedicated to inspiring students and fostering a love for learning.',
    specialization: 'Mathematics, Physics, Chemistry',
    experience: '10+ years',
    education: 'M.Sc. in Mathematics, B.Ed. in Secondary Education'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2"
        >
          {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  AA
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg border">
                    <Camera size={16} className="text-gray-600" />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Input
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="text-center text-xl font-bold"
                    />
                  </div>
                  <div>
                    <Input
                      value={profile.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="text-center"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">{profile.role}</p>
                </>
              )}
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-600">148</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-600">4.9</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Phone
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Birth Date
                </Label>
                {isEditing ? (
                  <Input
                    id="birthDate"
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.birthDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-2">
                  <User size={16} />
                  Experience
                </Label>
                {isEditing ? (
                  <Input
                    id="experience"
                    value={profile.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.experience}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin size={16} />
                Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.address}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              {isEditing ? (
                <Input
                  id="specialization"
                  value={profile.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.specialization}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              {isEditing ? (
                <Textarea
                  id="education"
                  value={profile.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.education}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="bio">About Me</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={6}
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}