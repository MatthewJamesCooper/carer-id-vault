
import React, { useState, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface TimeSlot {
  day: number;
  hour: number;
  available: boolean;
}

interface AvailabilityCalendarProps {
  onAvailabilityChange?: (availability: TimeSlot[]) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  onAvailabilityChange
}) => {
  const [availability, setAvailability] = useState<TimeSlot[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'add' | 'remove'>('add');
  const calendarRef = useRef<HTMLDivElement>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const isSlotAvailable = (day: number, hour: number): boolean => {
    return availability.some(slot => slot.day === day && slot.hour === hour && slot.available);
  };

  const toggleSlot = useCallback((day: number, hour: number, available?: boolean) => {
    setAvailability(prev => {
      const existingIndex = prev.findIndex(slot => slot.day === day && slot.hour === hour);
      let newAvailability = [...prev];
      
      if (existingIndex >= 0) {
        if (available !== undefined) {
          newAvailability[existingIndex].available = available;
        } else {
          newAvailability[existingIndex].available = !newAvailability[existingIndex].available;
        }
      } else {
        newAvailability.push({
          day,
          hour,
          available: available !== undefined ? available : true
        });
      }
      
      // Remove slots that are marked as unavailable
      newAvailability = newAvailability.filter(slot => slot.available);
      
      onAvailabilityChange?.(newAvailability);
      return newAvailability;
    });
  }, [onAvailabilityChange]);

  const handleMouseDown = (day: number, hour: number) => {
    const isCurrentlyAvailable = isSlotAvailable(day, hour);
    setDragMode(isCurrentlyAvailable ? 'remove' : 'add');
    setIsDragging(true);
    toggleSlot(day, hour, !isCurrentlyAvailable);
  };

  const handleMouseEnter = (day: number, hour: number) => {
    if (isDragging) {
      toggleSlot(day, hour, dragMode === 'add');
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12am';
    if (hour < 12) return `${hour}am`;
    if (hour === 12) return '12pm';
    return `${hour - 12}pm`;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Weekly Availability</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click and drag to select your available hours. Green slots indicate availability.
          </p>
        </div>
        
        <div 
          ref={calendarRef}
          className="overflow-x-auto"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="min-w-[800px]">
            {/* Header with days */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-xs font-medium text-gray-500 p-2">Time</div>
              {days.map((day, index) => (
                <div key={day} className="text-xs font-medium text-gray-700 text-center p-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Time slots */}
            <div className="space-y-1">
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-8 gap-1">
                  <div className="text-xs text-gray-500 p-2 text-right">
                    {formatHour(hour)}
                  </div>
                  {days.map((_, dayIndex) => (
                    <div
                      key={`${dayIndex}-${hour}`}
                      className={`
                        h-8 border border-gray-200 cursor-pointer transition-colors select-none
                        ${isSlotAvailable(dayIndex, hour) 
                          ? 'bg-green-200 hover:bg-green-300' 
                          : 'bg-gray-50 hover:bg-gray-100'
                        }
                      `}
                      onMouseDown={() => handleMouseDown(dayIndex, hour)}
                      onMouseEnter={() => handleMouseEnter(dayIndex, hour)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-200 border border-gray-200"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AvailabilityCalendar;
