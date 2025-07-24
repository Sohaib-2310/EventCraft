import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast, Toaster } from 'react-hot-toast';
import { ArrowLeft, Calendar as CalendarIcon, DollarSign, Users } from 'lucide-react';
import { format } from 'date-fns';
import emailjs from 'emailjs-com';

const EventCustomizer = ({ onBack }) => {
    const [selectedServices, setSelectedServices] = useState({});
    const [selectedDate, setSelectedDate] = useState();
    const [guestCount, setGuestCount] = useState(50);
    const [totalBudget, setTotalBudget] = useState(0);
    const [originalBudget, setOriginalBudget] = useState(0);
    const [hasNegotiated, setHasNegotiated] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        specialRequests: ''
    });

    const serviceCategories = {
        venue: {
            name: "Venue Management",
            options: [
                { name: "Banquet Hall", price: 150000, margin: 5000 },
                { name: "Garden Venue", price: 100000, margin: 3000 },
                { name: "Conference Room", price: 80000, margin: 0 },
                { name: "Outdoor Pavilion", price: 120000, margin: 4000 }
            ]
        },
        catering: {
            name: "Catering Services",
            options: [
                { name: "Premium Buffet", price: 1500, perPerson: true, margin: 200 },
                { name: "Plated Dinner", price: 2500, perPerson: true, margin: 300 },
                { name: "Cocktail Service", price: 1000, perPerson: true, margin: 0 },
                { name: "BBQ Package", price: 1200, perPerson: true, margin: 150 }
            ]
        },
        decoration: {
            name: "Decoration & Theming",
            options: [
                { name: "Elegant Florals", price: 60000, margin: 2000 },
                { name: "LED Lighting", price: 45000, margin: 1500 },
                { name: "Backdrop Design", price: 30000, margin: 0 },
                { name: "Table Centerpieces", price: 25000, margin: 1000 }
            ]
        },
        audiovisual: {
            name: "Audio/Visual Support",
            options: [
                { name: "Sound System", price: 35000, margin: 1500 },
                { name: "LED Screen", price: 60000, margin: 2500 },
                { name: "Microphones", price: 10000, margin: 0 },
                { name: "Live Streaming", price: 45000, margin: 2000 }
            ]
        },
        entertainment: {
            name: "Entertainment",
            options: [
                { name: "Live Band", price: 80000, margin: 3000 },
                { name: "DJ Service", price: 40000, margin: 1500 },
                { name: "Stand-up Comedy", price: 50000, margin: 2000 },
                { name: "Magic Show", price: 30000, margin: 0 }
            ]
        }
    };

    const blockedDates = [
        new Date(2024, 6, 15),
        new Date(2024, 6, 22),
        new Date(2024, 6, 29),
    ];

    const calculateTotal = () => {
        let total = 0;
        Object.entries(selectedServices).forEach(([_, services]) => {
            services.forEach(service => {
                total += service.perPerson ? service.price * guestCount : service.price;
            });
        });
        if (!hasNegotiated) setOriginalBudget(total);
        setTotalBudget(total);
    };

    useEffect(() => {
        calculateTotal();
        setHasNegotiated(false);
    }, [selectedServices, guestCount]);

    const handleServiceToggle = (category, service) => {
        setSelectedServices(prev => {
            const categoryServices = prev[category] || [];
            const isSelected = categoryServices.some(s => s.name === service.name);
            if (isSelected) {
                return {
                    ...prev,
                    [category]: categoryServices.filter(s => s.name !== service.name)
                };
            } else {
                return {
                    ...prev,
                    [category]: [...categoryServices, service]
                };
            }
        });
    };

    const handleNegotiation = () => {
        if (hasNegotiated) {
            toast.error("You have already used your one-time negotiation discount for this event.");
            return;
        }

        let discount = 0;
        let hasDiscountableServices = false;

        Object.entries(selectedServices).forEach(([_, services]) => {
            services.forEach(service => {
                if (service.margin > 0) {
                    hasDiscountableServices = true;
                    discount += service.perPerson ? service.margin * guestCount : service.margin;
                }
            });
        });

        if (!hasDiscountableServices) {
            toast.error("The selected services have fixed pricing and cannot be negotiated.");
            return;
        }

        setOriginalBudget(totalBudget);
        setTotalBudget(prev => prev - discount);
        setHasNegotiated(true);

        toast.success(`Negotiation Applied! You saved PKR ${discount.toLocaleString()}!`);
    };

    const handleBooking = () => {
        if (!selectedDate) {
            toast.error("Please select an event date before booking.");
            return;
        }

        if (Object.keys(selectedServices).length === 0) {
            toast.error("Please select at least one service for your event.");
            return;
        }

        setShowBookingForm(true);
    };

    const submitBooking = () => {
        const serviceID = 'service_dbk69bn';
        const templateID = 'template_mp3mw5n';
        const userID = 'dNiRqW19iEm3Wxm7k'; // public key from EmailJS

        const templateParams = {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            event_type: bookingData.eventType || 'Event Booking',
            message: bookingData.specialRequests || 'No special requests provided.',
            event_date: selectedDate ? format(selectedDate, 'PPP') : 'Not selected',
            guest_count: guestCount,
            budget: `PKR ${totalBudget.toLocaleString()}`,
            negotiated: hasNegotiated ? 'Yes' : 'No',

            services: Object.entries(selectedServices)
                .map(([category, services]) => {
                    return `${serviceCategories[category].name}:\n` + services.map(s =>
                        ` - ${s.name} (PKR ${s.perPerson ? s.price * guestCount : s.price})`).join('\n');
                }).join('\n\n')
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(() => {
                toast.success("Booking Confirmed! We'll contact you within 24 hours to finalize your event details.");

                setShowBookingForm(false);
                onBack();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                toast.error("Booking Failed! Something went wrong while sending your booking. Please try again.");
            });
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-6">
            <Toaster position="bottom-right" />

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button onClick={onBack} variant="outline" size="sm">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Services
                    </Button>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Customize Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                            Event
                        </span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Services Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        {Object.entries(serviceCategories).map(([categoryKey, category]) => (
                            <Card key={categoryKey} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-gray-900">{category.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {category.options.map((service, idx) => {
                                            const isSelected =
                                                selectedServices[categoryKey]?.some((s) => s.name === service.name);
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${isSelected
                                                        ? "border-purple-500 bg-purple-50"
                                                        : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                                                        }`}
                                                    onClick={() => handleServiceToggle(categoryKey, service)}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Checkbox checked={isSelected} className="pointer-events-none" />
                                                        <div className="flex flex-col items-end">
                                                            <Badge variant={isSelected ? "default" : "secondary"}>
                                                                PKR {service.price.toLocaleString()}
                                                                {service.perPerson ? "/person" : ""}
                                                            </Badge>
                                                            {service.margin === 0 && (
                                                                <span className="text-xs text-blue-600 mt-1 font-medium">
                                                                    Fixed Amount
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Summary Panel */}
                    <div className="space-y-6">
                        {/* Guest Count */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users size={20} />
                                    Guest Count
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    type="number"
                                    value={guestCount}
                                    onChange={(e) => setGuestCount(Number(e.target.value))}
                                    min="1"
                                    className="text-lg font-semibold"
                                />
                            </CardContent>
                        </Card>

                        {/* Date Selection */}
                        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarIcon size={20} />
                                    Event Date
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            disabled={(date) =>
                                                date < new Date() ||
                                                blockedDates.some(
                                                    (blockedDate) =>
                                                        date.toDateString() === blockedDate.toDateString()
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </CardContent>
                        </Card>

                        {/* Budget Summary */}
                        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <DollarSign size={20} />
                                    Budget Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    {hasNegotiated && (
                                        <div className="text-2xl font-bold mb-2 opacity-60">
                                            <span className="line-through">
                                                PKR {originalBudget.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-3xl font-bold mb-4">
                                        PKR {totalBudget.toLocaleString()}
                                    </div>
                                    {hasNegotiated && (
                                        <Badge className="bg-green-500 text-white mb-4">
                                            Negotiated Price Applied!
                                        </Badge>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(selectedServices).map(([category, services]) => (
                                        <div key={category} className="text-sm opacity-90">
                                            <div className="font-semibold">{serviceCategories[category].name}:</div>
                                            {services.map((service, idx) => (
                                                <div key={idx} className="ml-2">
                                                    {service.name}: PKR{" "}
                                                    {service.perPerson
                                                        ? (service.price * guestCount).toLocaleString()
                                                        : service.price.toLocaleString()}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={handleNegotiation}
                                variant="outline"
                                className="w-full"
                                disabled={hasNegotiated || totalBudget === 0}
                            >
                                {hasNegotiated ? "Negotiation Applied" : "Request Negotiation"}
                            </Button>
                            <Button
                                onClick={handleBooking}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                disabled={totalBudget === 0}
                            >
                                Book This Event
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Booking Form Dialog */}
                <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Complete Your Booking</DialogTitle>
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
                                    type="tel"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                    required
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div>
                                <Label htmlFor="eventType">Event Type</Label>
                                <Input
                                    id="eventType"
                                    value={bookingData.eventType}
                                    onChange={(e) =>
                                        setBookingData({ ...bookingData, eventType: e.target.value })
                                    }
                                    placeholder="e.g., Wedding, Corporate, Birthday"
                                />
                            </div>
                            <div>
                                <Label htmlFor="requests">Special Requests</Label>
                                <Textarea
                                    id="requests"
                                    value={bookingData.specialRequests}
                                    onChange={(e) =>
                                        setBookingData({ ...bookingData, specialRequests: e.target.value })
                                    }
                                    placeholder="Any special requirements or requests..."
                                />
                            </div>
                            <Button
                                onClick={submitBooking}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                disabled={
                                    !bookingData.name || !bookingData.email || !bookingData.phone
                                }
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default EventCustomizer;
