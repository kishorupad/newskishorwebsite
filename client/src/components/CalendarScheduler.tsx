import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Clock, Check } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  platform: string;
}

export default function CalendarScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'time' | 'confirm'>('calendar');
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    platform: '',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Available time slots
  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setBookingStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingData({ ...bookingData, date: selectedDate || '', time });
    setBookingStep('confirm');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingStep('calendar');
      setSelectedDate(null);
      setSelectedTime(null);
      setBookingData({ date: '', time: '', name: '', email: '', phone: '', platform: '' });
    }, 3000);
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (bookingConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 p-4 bg-green-500/20 rounded-full">
          <Check size={48} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground mb-2">
          Your consultation has been scheduled for {selectedDate} at {selectedTime}
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to {bookingData.email}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {bookingStep === 'calendar' && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-6">Select a Date</h3>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-2 hover:bg-muted rounded-lg transition"
            >
              <ChevronLeft size={20} />
            </button>
            <h4 className="text-lg font-semibold">{monthName}</h4>
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-2 hover:bg-muted rounded-lg transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                disabled={!day}
                className={`p-3 rounded-lg text-sm font-medium transition ${
                  !day
                    ? 'invisible'
                    : selectedDate === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted bg-muted/50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {selectedDate && (
            <Button
              onClick={() => setBookingStep('time')}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue to Time Selection
            </Button>
          )}
        </Card>
      )}

      {bookingStep === 'time' && selectedDate && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-2">Select a Time</h3>
          <p className="text-muted-foreground mb-6">
            Available times for {new Date(selectedDate).toLocaleDateString()}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`p-4 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                  !slot.available
                    ? 'border-border opacity-50 cursor-not-allowed'
                    : selectedTime === slot.time
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary'
                }`}
              >
                <Clock size={16} />
                <span className="font-medium">{slot.time}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setBookingStep('calendar')}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => setBookingStep('confirm')}
              disabled={!selectedTime}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Continue
            </Button>
          </div>
        </Card>
      )}

      {bookingStep === 'confirm' && selectedDate && selectedTime && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-bold mb-6">Confirm Your Booking</h3>

          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Scheduled Date & Time</p>
            <p className="text-lg font-semibold">
              {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                required
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                required
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+977-98xxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Platform</label>
              <select
                required
                value={bookingData.platform}
                onChange={(e) => setBookingData({ ...bookingData, platform: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select platform</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setBookingStep('time')}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
