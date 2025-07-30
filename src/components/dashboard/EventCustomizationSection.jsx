import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import { Building, Utensils, Palette, Volume2, Music } from 'lucide-react';

const EventCustomizationSection = () => {
    const initialServices = [
        {
            id: 1,
            icon: Building,
            title: "Venue Management",
            services: [
                { id: 1, name: "Banquet Hall", price: 150000, margin: 5000 },
                { id: 2, name: "Garden Venue", price: 100000, margin: 3000 },
                { id: 3, name: "Conference Room", price: 80000, margin: 0 },
                { id: 4, name: "Outdoor Pavilion", price: 120000, margin: 4000 }
            ]
        },
        {
            id: 2,
            icon: Utensils,
            title: "Catering Services",
            services: [
                { id: 5, name: "Premium Buffet", price: 1500, margin: 200, perPerson: true },
                { id: 6, name: "Plated Dinner", price: 2500, margin: 300, perPerson: true },
                { id: 7, name: "Cocktail Service", price: 1000, margin: 0, perPerson: true },
                { id: 8, name: "BBQ Package", price: 1200, margin: 150, perPerson: true }
            ]
        },
        {
            id: 3,
            icon: Palette,
            title: "Decoration & Theming",
            services: [
                { id: 9, name: "Elegant Florals", price: 60000, margin: 2000 },
                { id: 10, name: "LED Lighting", price: 45000, margin: 1500 },
                { id: 11, name: "Backdrop Design", price: 30000, margin: 0 },
                { id: 12, name: "Table Centerpieces", price: 25000, margin: 1000 }
            ]
        },
        {
            id: 4,
            icon: Volume2,
            title: "Audio/Visual Support",
            services: [
                { id: 13, name: "Sound System", price: 35000, margin: 1500 },
                { id: 14, name: "LED Screen", price: 60000, margin: 2500 },
                { id: 15, name: "Microphones", price: 10000, margin: 0 },
                { id: 16, name: "Live Streaming", price: 45000, margin: 2000 }
            ]
        },
        {
            id: 5,
            icon: Music,
            title: "Entertainment",
            services: [
                { id: 17, name: "Live Band", price: 80000, margin: 3000 },
                { id: 18, name: "DJ Service", price: 40000, margin: 1500 },
                { id: 19, name: "Stand-up Comedy", price: 50000, margin: 2000 },
                { id: 20, name: "Magic Show", price: 30000, margin: 0 }
            ]
        }
    ];

    const [serviceCategories, setServiceCategories] = useState(initialServices);
    const [editingService, setEditingService] = useState(null);
    const [editedService, setEditedService] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editedCategoryTitle, setEditedCategoryTitle] = useState('');

    const handleEditService = (service) => {
        setEditingService(service.id);
        setEditedService({ ...service });
    };

    const handleUpdateService = (serviceId) => {
        if (!editedService) return;

        setServiceCategories(serviceCategories.map(category => ({
            ...category,
            services: category.services.map(service =>
                service.id === serviceId ? editedService : service
            )
        })));
        setEditingService(null);
        setEditedService(null);
        toast.success("Event customization service has been successfully updated.");
    };

    const handleCancelEdit = () => {
        setEditingService(null);
        setEditedService(null);
    };

    const updateEditedService = (field, value) => {
        if (!editedService) return;
        setEditedService({ ...editedService, [field]: value });
    };

    const addNewService = (categoryId) => {
        const newId = Math.max(...serviceCategories.flatMap(cat => cat.services.map(s => s.id))) + 1;
        const newService = {
            id: newId,
            name: "New Service",
            price: 10000,
            margin: 0
        };

        setServiceCategories(serviceCategories.map(category =>
            category.id === categoryId
                ? { ...category, services: [...category.services, newService] }
                : category
        ));

        toast.success("New service has been added successfully.");
    };

    const removeService = (serviceId) => {
        setServiceCategories(serviceCategories.map(category => ({
            ...category,
            services: category.services.filter(service => service.id !== serviceId)
        })));

        toast.success("Service has been removed successfully.");
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category.id);
        setEditedCategoryTitle(category.title);
    };

    const handleUpdateCategory = (categoryId) => {
        setServiceCategories(serviceCategories.map(category =>
            category.id === categoryId ? { ...category, title: editedCategoryTitle } : category
        ));
        setEditingCategory(null);
        setEditedCategoryTitle('');
        toast.success("Service category has been successfully updated.");
    };

    const handleCancelCategoryEdit = () => {
        setEditingCategory(null);
        setEditedCategoryTitle('');
    };

    const addNewCategory = () => {
        const newId = Math.max(...serviceCategories.map(cat => cat.id)) + 1;
        const newCategory = {
            id: newId,
            icon: Building,
            title: "New Category",
            services: []
        };
        setServiceCategories([...serviceCategories, newCategory]);
        toast.success("New service category has been added successfully.");
    };

    const removeCategory = (categoryId) => {
        setServiceCategories(serviceCategories.filter(category => category.id !== categoryId));
        toast.success("Service category has been removed successfully.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Event Customization Services</h2>
                <Button onClick={addNewCategory} variant="outline">
                    Add New Category
                </Button>
            </div>
            {serviceCategories.map((category) => {
                const IconComponent = category.icon;
                const isEditingCategoryTitle = editingCategory === category.id;

                return (
                    <Card key={category.id} className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                                <IconComponent className="text-white" size={24} />
                            </div>
                            {isEditingCategoryTitle ? (
                                <div className="flex gap-2 flex-1">
                                    <Input
                                        value={editedCategoryTitle}
                                        onChange={(e) => setEditedCategoryTitle(e.target.value)}
                                        className="text-xl font-semibold"
                                    />
                                    <Button size="sm" onClick={() => handleUpdateCategory(category.id)}>Save</Button>
                                    <Button size="sm" variant="outline" onClick={handleCancelCategoryEdit}>Cancel</Button>
                                </div>
                            ) : (
                                <h3 className="text-xl font-semibold flex-1">{category.title}</h3>
                            )}
                            <div className="flex gap-2">
                                {!isEditingCategoryTitle && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        Edit Category
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addNewService(category.id)}
                                >
                                    Add Service
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeCategory(category.id)}
                                >
                                    Remove Category
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {category.services.map((service) => {
                                const isEditing = editingService === service.id;
                                const currentService = isEditing ? editedService : service;

                                return (
                                    <div key={service.id} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                                            <div>
                                                <Label>Service Name</Label>
                                                <Input
                                                    value={currentService.name}
                                                    onChange={(e) => updateEditedService('name', e.target.value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div>
                                                <Label>Price (PKR)</Label>
                                                <Input
                                                    type="number"
                                                    value={currentService.price}
                                                    onChange={(e) => updateEditedService('price', Number(e.target.value))}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div>
                                                <Label>Margin (PKR)</Label>
                                                <Input
                                                    type="number"
                                                    value={currentService.margin}
                                                    onChange={(e) => updateEditedService('margin', Number(e.target.value))}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    checked={currentService.perPerson || false}
                                                    onCheckedChange={(checked) => updateEditedService('perPerson', checked)}
                                                    disabled={!isEditing}
                                                />
                                                <Label>Per Person</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    checked={currentService.margin === 0}
                                                    onCheckedChange={(checked) => updateEditedService('margin', checked ? 0 : 1000)}
                                                    disabled={!isEditing}
                                                />
                                                <Label>Fixed Pricing</Label>
                                            </div>
                                            <div className="flex gap-2">
                                                {isEditing ? (
                                                    <>
                                                        <Button size="sm" onClick={() => handleUpdateService(service.id)}>Save</Button>
                                                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button size="sm" onClick={() => handleEditService(service)}>Edit</Button>
                                                        <Button size="sm" variant="destructive" onClick={() => removeService(service.id)}>Remove</Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {!isEditing && (
                                            <div className="mt-3 flex gap-2">
                                                <Badge variant="outline">
                                                    PKR {currentService.price.toLocaleString()}{currentService.perPerson ? '/person' : ''}
                                                </Badge>
                                                <Badge variant="secondary">Margin: PKR {currentService.margin.toLocaleString()}</Badge>
                                                {currentService.margin === 0 && <Badge>Fixed Price</Badge>}
                                                {currentService.perPerson && <Badge variant="outline">Per Person</Badge>}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default EventCustomizationSection;
