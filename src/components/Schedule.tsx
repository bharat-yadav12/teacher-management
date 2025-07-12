"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  duration: number;
  color: string;
  type: 'class' | 'meeting' | 'break';
}

const timeSlots = [
  '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am',
  '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm',
  '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialSchedule: Record<string, ScheduleEvent[]> = {
  Monday: [
    { id: '1', title: 'Math - Grade 10', time: '9:00am', duration: 60, color: 'bg-blue-500', type: 'class' },
    { id: '2', title: 'Physics Lab', time: '2:00pm', duration: 90, color: 'bg-green-500', type: 'class' }
  ],
  Tuesday: [
    { id: '3', title: 'Chemistry - Grade 11', time: '10:00am', duration: 60, color: 'bg-purple-500', type: 'class' }
  ],
  Wednesday: [
    { id: '4', title: 'Math - Grade 12', time: '9:00am', duration: 60, color: 'bg-blue-500', type: 'class' },
    { id: '5', title: 'Parent Meeting', time: '3:00pm', duration: 30, color: 'bg-orange-500', type: 'meeting' }
  ],
  Thursday: [
    { id: '6', title: 'Physics - Grade 10', time: '11:00am', duration: 60, color: 'bg-green-500', type: 'class' },
    { id: '7', title: 'Advanced Math', time: '2:30pm', duration: 90, color: 'bg-indigo-500', type: 'class' }
  ],
  Friday: [
    { id: '8', title: 'Chemistry Lab', time: '9:30am', duration: 120, color: 'bg-purple-500', type: 'class' }
  ],
  Saturday: [],
  Sunday: []
};

export function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedSlot, setSelectedSlot] = useState<{day: string, time: string} | null>(null);

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1); // Monday

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const getEventsForTimeSlot = (day: string, timeSlot: string) => {
    return schedule[day]?.filter(event => event.time === timeSlot) || [];
  };

  const formatTime = (time: string) => {
    return time.replace('am', ' AM').replace('pm', ' PM');
  };

  const weekDates = getWeekDates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Schedule</h1>
          <p className="text-gray-600 mt-2">Manage your teaching schedule and appointments</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Event
        </Button>
      </div>

      {/* Schedule Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-bold text-gray-900">24 Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <div className="w-5 h-5 bg-green-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Classes</p>
                <p className="text-xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                <div className="w-5 h-5 bg-orange-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Meetings</p>
                <p className="text-xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                <div className="w-5 h-5 bg-purple-500 rounded"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Free Slots</p>
                <p className="text-xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Week Navigation */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Week of {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {' '}
              {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-8 gap-1 mb-4">
                <div className="p-3 text-center font-medium text-gray-600">Time</div>
                {daysOfWeek.map((day, index) => (
                  <div key={day} className="p-3 text-center">
                    <div className="font-medium text-gray-900">{day.slice(0, 3)}</div>
                    <div className="text-sm text-gray-500">
                      {weekDates[index].getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule Grid */}
              <div className="space-y-1">
                {timeSlots.map((timeSlot) => (
                  <div key={timeSlot} className="grid grid-cols-8 gap-1">
                    <div className="p-2 text-sm text-gray-600 text-center border-r">
                      {formatTime(timeSlot)}
                    </div>
                    {daysOfWeek.map((day) => {
                      const events = getEventsForTimeSlot(day, timeSlot);
                      return (
                        <div
                          key={`${day}-${timeSlot}`}
                          className={cn(
                            "min-h-[50px] border border-gray-100 rounded cursor-pointer transition-colors",
                            "hover:bg-gray-50",
                            selectedSlot?.day === day && selectedSlot?.time === timeSlot
                              ? "bg-blue-50 border-blue-200"
                              : ""
                          )}
                          onClick={() => setSelectedSlot({day, time: timeSlot})}
                        >
                          {events.map((event) => (
                            <div
                              key={event.id}
                              className={cn(
                                "m-1 p-2 rounded text-white text-xs font-medium",
                                event.color
                              )}
                              style={{ 
                                height: `${Math.min(event.duration / 30 * 25, 100)}px`,
                                minHeight: '30px'
                              }}
                            >
                              <div className="truncate">{event.title}</div>
                              <div className="text-xs opacity-75">{event.duration}min</div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Mathematics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Physics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">Chemistry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-600">Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-500 rounded"></div>
              <span className="text-sm text-gray-600">Advanced Classes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}