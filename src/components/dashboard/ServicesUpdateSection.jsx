import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { Building, Utensils, Palette, Volume2, Music, Users, Truck, Camera, Shield, Megaphone } from 'lucide-react';

const ServicesUpdateSection = () => {
    const initialServices = [
        { id: 1, icon: Building, title: "Venue Management", description: "Premium venues for every occasion", features: ["Indoor & Outdoor", "Capacity Planning", "Setup Design"] },
        { id: 2, icon: Utensils, title: "Catering Services", description: "Exquisite culinary experiences", features: ["Multi-Cuisine", "Dietary Options", "Professional Service"] },
        { id: 3, icon: Palette, title: "Decoration & Theming", description: "Transform spaces into magical settings", features: ["Custom Themes", "Floral Arrangements", "Lighting Design"] },
        { id: 4, icon: Volume2, title: "Audio/Visual Support", description: "Crystal clear sound and stunning visuals", features: ["Sound Systems", "LED Screens", "Live Streaming"] },
        { id: 5, icon: Music, title: "Entertainment", description: "Memorable performances and activities", features: ["Live Music", "DJ Services", "Special Acts"] },
        { id: 6, icon: Users, title: "Guest Management", description: "Seamless guest experience management", features: ["Registration", "Coordination", "VIP Services"] },
        { id: 7, icon: Truck, title: "Transportation", description: "Convenient travel arrangements", features: ["Shuttle Service", "Luxury Cars", "Group Transport"] },
        { id: 8, icon: Camera, title: "Photography/Videography", description: "Capture every precious moment", features: ["Professional Photos", "Video Coverage", "Live Streaming"] },
        { id: 9, icon: Shield, title: "Security Services", description: "Safe and secure event environment", features: ["Crowd Control", "VIP Protection", "Emergency Response"] },
        { id: 10, icon: Megaphone, title: "Event Marketing", description: "Promote your event effectively", features: ["Digital Marketing", "Social Media", "Print Materials"] }
    ];

    const [services, setServices] = useState(initialServices);
    const [editingService, setEditingService] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedFeatures, setEditedFeatures] = useState([]);

    const handleEditService = (service) => {
        setEditingService(service.id);
        setEditedTitle(service.title);
        setEditedDescription(service.description);
        setEditedFeatures([...service.features]);
    };

    const handleUpdateService = (serviceId) => {
        setServices(services.map(service =>
            service.id === serviceId
                ? { ...service, title: editedTitle, description: editedDescription, features: editedFeatures }
                : service
        ));
        setEditingService(null);
        toast.success("Service has been successfully updated.");
    };

    const handleCancelEdit = () => {
        setEditingService(null);
        setEditedTitle('');
        setEditedDescription('');
        setEditedFeatures([]);
    };

    const addFeature = () => {
        setEditedFeatures([...editedFeatures, 'New Feature']);
    };

    const updateFeature = (index, value) => {
        const updated = [...editedFeatures];
        updated[index] = value;
        setEditedFeatures(updated);
    };

    const removeFeature = (index) => {
        setEditedFeatures(editedFeatures.filter((_, i) => i !== index));
    };

    const addNewService = () => {
        const newId = Math.max(...services.map(s => s.id)) + 1;
        const newService = {
            id: newId,
            icon: Building,
            title: "New Service",
            description: "New service description",
            features: ["New Feature"]
        };
        setServices([...services, newService]);
        toast.success("New service has been added successfully.");
    };

    const removeService = (serviceId) => {
        setServices(services.filter(service => service.id !== serviceId));
        toast.success("Service has been removed successfully.");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Services Management</h2>
            {services.map((service) => {
                const IconComponent = service.icon;
                const isEditing = editingService === service.id;

                return (
                    <Card key={service.id} className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                                <IconComponent className="text-white" size={24} />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`title-${service.id}`}>Service Title</Label>
                                        <Input
                                            id={`title-${service.id}`}
                                            value={isEditing ? editedTitle : service.title}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`desc-${service.id}`}>Description</Label>
                                        <Textarea
                                            id={`desc-${service.id}`}
                                            value={isEditing ? editedDescription : service.description}
                                            onChange={(e) => setEditedDescription(e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Features</Label>
                                    {isEditing ? (
                                        <div className="space-y-2 mt-2">
                                            {editedFeatures.map((feature, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <Input
                                                        value={feature}
                                                        onChange={(e) => updateFeature(idx, e.target.value)}
                                                        className="flex-1"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => removeFeature(idx)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button size="sm" variant="outline" onClick={addFeature}>
                                                Add Feature
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {service.features.map((feature, idx) => (
                                                <Badge key={idx} variant="secondary">{feature}</Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button onClick={() => handleUpdateService(service.id)}>Save Changes</Button>
                                            <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEditService(service)}>Edit Service</Button>
                                            <Button variant="destructive" onClick={() => removeService(service.id)}>Remove Service</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })}
            <Button onClick={addNewService} className="mt-4">Add New Service</Button>
        </div>
    );
};

export default ServicesUpdateSection;