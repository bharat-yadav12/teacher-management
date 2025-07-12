"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Award,
  DollarSign,
  Users
} from 'lucide-react';

interface Qualification {
  id: string;
  name: string;
  rate: number;
  type: 'private' | 'group';
}

export function Qualifications() {
  const [privateQualifications, setPrivateQualifications] = useState<Qualification[]>([
    { id: '1', name: 'Vocal Contemporary', rate: 35.00, type: 'private' },
    { id: '2', name: 'Vocal Core', rate: 35.00, type: 'private' },
    { id: '3', name: 'Vocal Jazz', rate: 35.00, type: 'private' },
    { id: '4', name: 'Vocal Pop', rate: 35.00, type: 'private' },
    { id: '5', name: 'Instrument', rate: 35.00, type: 'private' },
  ]);

  const [groupQualifications, setGroupQualifications] = useState<Qualification[]>([
    { id: '6', name: 'Mathematics Group', rate: 25.00, type: 'group' },
    { id: '7', name: 'Physics Laboratory', rate: 30.00, type: 'group' },
  ]);

  const [newQualification, setNewQualification] = useState({
    name: '',
    rate: '',
    type: 'private' as 'private' | 'group'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addQualification = () => {
    if (newQualification.name && newQualification.rate) {
      const qualification: Qualification = {
        id: Date.now().toString(),
        name: newQualification.name,
        rate: parseFloat(newQualification.rate),
        type: newQualification.type
      };

      if (newQualification.type === 'private') {
        setPrivateQualifications([...privateQualifications, qualification]);
      } else {
        setGroupQualifications([...groupQualifications, qualification]);
      }

      setNewQualification({ name: '', rate: '', type: 'private' });
      setShowAddForm(false);
    }
  };

  const deleteQualification = (id: string, type: 'private' | 'group') => {
    if (type === 'private') {
      setPrivateQualifications(privateQualifications.filter(q => q.id !== id));
    } else {
      setGroupQualifications(groupQualifications.filter(q => q.id !== id));
    }
  };

  const QualificationCard = ({ qualification, onDelete }: { 
    qualification: Qualification; 
    onDelete: () => void; 
  }) => (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          qualification.type === 'private' 
            ? 'bg-blue-50 text-blue-600' 
            : 'bg-green-50 text-green-600'
        }`}>
          {qualification.type === 'private' ? <Award size={20} /> : <Users size={20} />}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{qualification.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{qualification.type} Session</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-lg text-gray-900">${qualification.rate.toFixed(2)}</p>
          <p className="text-sm text-gray-500">per hour</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            <Edit3 size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-700"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Qualifications & Rates</h1>
          <p className="text-gray-600 mt-2">Manage your teaching qualifications and hourly rates</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add Qualification
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Private Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{privateQualifications.length}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                <Award size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Group Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{groupQualifications.length}</p>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                <Users size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  $
                  {(
                    [...privateQualifications, ...groupQualifications]
                      .reduce((acc, q) => acc + q.rate, 0) /
                    (privateQualifications.length + groupQualifications.length)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg">
                <DollarSign size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Qualification Form */}
      {showAddForm && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Add New Qualification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Qualification Name</Label>
                <Input
                  id="name"
                  value={newQualification.name}
                  onChange={(e) => setNewQualification({...newQualification, name: e.target.value})}
                  placeholder="e.g., Advanced Mathematics"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rate">Hourly Rate ($)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={newQualification.rate}
                  onChange={(e) => setNewQualification({...newQualification, rate: e.target.value})}
                  placeholder="35.00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Session Type</Label>
                <select
                  id="type"
                  value={newQualification.type}
                  onChange={(e) => setNewQualification({...newQualification, type: e.target.value as 'private' | 'group'})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="private">Private Session</option>
                  <option value="group">Group Session</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button onClick={addQualification}>Add Qualification</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Private Qualifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Private Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {privateQualifications.map((qualification) => (
              <QualificationCard
                key={qualification.id}
                qualification={qualification}
                onDelete={() => deleteQualification(qualification.id, 'private')}
              />
            ))}
            {privateQualifications.length === 0 && (
              <p className="text-center text-gray-500 py-8">No private qualifications added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Group Qualifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Group Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {groupQualifications.map((qualification) => (
              <QualificationCard
                key={qualification.id}
                qualification={qualification}
                onDelete={() => deleteQualification(qualification.id, 'group')}
              />
            ))}
            {groupQualifications.length === 0 && (
              <p className="text-center text-gray-500 py-8">No group qualifications added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}