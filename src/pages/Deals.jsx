import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Star, Crown, Zap } from 'lucide-react';
import emailjs from 'emailjs-com';

const Deals = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    specialRequests: ''
  });

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 299900,
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      popular: false,
      features: [
        'Venue for up to 50 guests',
        'Basic catering (buffet)',
        'Simple decoration',
        'Sound system',
        '4-hour event duration',
        'Basic photography (2 hours)'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 499900,
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      popular: true,
      features: [
        'Venue for up to 100 guests',
        'Premium buffet & cocktails',
        'Enhanced decoration & lighting',
        'Professional sound & DJ',
        '6-hour event duration',
        'Photography & videography (4 hours)',
        'Guest management service'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 799900,
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      popular: false,
      features: [
        'Venue for up to 200 guests',
        'Gourmet plated dinner',
        'Luxury decoration & florals',
        'Live band & entertainment',
        '8-hour event duration',
        'Full-day photography & videography',
        'Dedicated event coordinator',
        'Transportation service',
        'Security service'
      ]
    }
  ];

  const handleBookPackage = (packageId) => {
    setSelectedPackage(packageId);
    setShowBookingForm(true);
  };

  const submitBooking = async () => {
    // const serviceID = 'service_dbk69bn';
    // const templateID = 'template_mp3mw5n';
    // const userID = 'dNiRqW19iEm3Wxm7k'; // public key from EmailJS

    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);

    const payload = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      eventType: bookingData.eventType,
      eventDate: bookingData.eventDate,
      guestCount: bookingData.guestCount,
      specialRequests: bookingData.specialRequests || 'No special requests provided.',
      packageName: selectedPkg?.name,
      packagePrice: `PKR ${selectedPkg?.price.toLocaleString()}`
    };

    try {
      // EmailJS
      // await emailjs.send(serviceID, templateID, payload, userID);

      // Backend
      await fetch('http://localhost:5000/api/package-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      toast.success(`Your ${selectedPkg?.name} has been booked. We'll contact you within 24 hours.`);
      setShowBookingForm(false);
      setBookingData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        specialRequests: ''
      });
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="deals" className="py-20 px-6 bg-gradient-to-br from-slate-900 to-purple-900">
      <Toaster position="bottom-right" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Choose Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Package</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Pre-designed packages for every budget and occasion. Get everything you need
            for an unforgettable event at unbeatable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card key={pkg.id} className={`relative overflow-hidden border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 ${pkg.popular ? 'ring-4 ring-yellow-400' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-90`} />

                <CardHeader className="relative z-10 text-center text-white pt-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <IconComponent size={36} className="text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold mb-2">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold mb-4">
                    PKR {pkg.price.toLocaleString()}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 text-white px-8 pb-8">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check size={20} className="text-green-300 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleBookPackage(pkg.id)}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                  >
                    Book This Package
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Book {packages.find(pkg => pkg.id === selectedPackage)?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  required
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Input
                  id="eventType"
                  value={bookingData.eventType}
                  onChange={(e) => setBookingData({ ...bookingData, eventType: e.target.value })}
                  placeholder="e.g., Wedding, Corporate, Birthday"
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventDate">Preferred Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={bookingData.eventDate}
                  onChange={(e) => setBookingData({ ...bookingData, eventDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guestCount">Expected Guest Count *</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={bookingData.guestCount}
                  onChange={(e) => setBookingData({ ...bookingData, guestCount: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="requests">Special Requests</Label>
                <Textarea
                  id="requests"
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  placeholder="Any special requirements or customizations..."
                />
              </div>
              <Button
                onClick={submitBooking}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.eventType || !bookingData.eventDate || !bookingData.guestCount}
              >
                Confirm Package Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Deals;