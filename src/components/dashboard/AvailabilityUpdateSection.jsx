import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

const AvailabilityUpdateSection = () => {
  const [availability, setAvailability] = useState({
    availableDates: ['2024-02-01', '2024-02-05', '2024-02-10'],
    bookedDates: ['2024-02-14', '2024-02-20', '2024-03-15']
  });
  
  const [newAvailableDate, setNewAvailableDate] = useState('');
  const [newBookedDate, setNewBookedDate] = useState('');

  const addAvailableDate = () => {
    if (!newAvailableDate) return toast.error("Please select a date first.");

    if (availability.availableDates.includes(newAvailableDate)) {
      return toast.error("This date is already in the available list.");
    }

    if (availability.bookedDates.includes(newAvailableDate)) {
      return toast.error("This date is already booked. Remove it from booked dates first.");
    }

    setAvailability(prev => ({
      ...prev,
      availableDates: [...prev.availableDates, newAvailableDate]
    }));
    setNewAvailableDate('');
    toast.success("Available date has been added successfully.");
  };

  const removeAvailableDate = (dateToRemove) => {
    setAvailability(prev => ({
      ...prev,
      availableDates: prev.availableDates.filter(date => date !== dateToRemove)
    }));
    toast.success("Available date has been removed successfully.");
  };

  const addBookedDate = () => {
    if (!newBookedDate) return toast.error("Please select a date first.");

    if (availability.bookedDates.includes(newBookedDate)) {
      return toast.error("This date is already in the booked list.");
    }

    if (availability.availableDates.includes(newBookedDate)) {
      return toast.error("This date is already available. Remove it from available dates first.");
    }

    setAvailability(prev => ({
      ...prev,
      bookedDates: [...prev.bookedDates, newBookedDate]
    }));
    setNewBookedDate('');
    toast.success("Booked date has been added successfully.");
  };

  const removeBookedDate = (dateToRemove) => {
    setAvailability(prev => ({
      ...prev,
      bookedDates: prev.bookedDates.filter(date => date !== dateToRemove)
    }));
    toast.success("Booked date has been removed successfully.");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Availability Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Available Dates Section */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Available Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {availability.availableDates.map((date, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span>{date}</span>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => removeAvailableDate(date)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Input 
                type="date" 
                value={newAvailableDate}
                onChange={(e) => setNewAvailableDate(e.target.value)}
              />
              <Button size="sm" onClick={addAvailableDate} className="w-full">
                Add Available Date
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Booked Dates Section */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Booked Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {availability.bookedDates.map((date, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span>{date}</span>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => removeBookedDate(date)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Input 
                type="date" 
                value={newBookedDate}
                onChange={(e) => setNewBookedDate(e.target.value)}
              />
              <Button size="sm" onClick={addBookedDate} className="w-full">
                Add Booked Date
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvailabilityUpdateSection;