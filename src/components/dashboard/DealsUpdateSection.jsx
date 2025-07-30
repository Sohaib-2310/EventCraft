import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

const DealsUpdateSection = () => {
  const initialDeals = [
    { 
      id: 1, 
      name: "Basic Package", 
      price: 299900, 
      services: [
        "Venue for up to 50 guests",
        "Basic catering (buffet)",
        "Simple decoration",
        "Sound system",
        "4-hour event duration",
        "Basic photography (2 hours)"
      ] 
    },
    { 
      id: 2, 
      name: "Standard Package", 
      price: 499900, 
      services: [
        "Venue for up to 100 guests",
        "Premium buffet & cocktails",
        "Enhanced decoration & lighting",
        "Professional sound & DJ",
        "6-hour event duration",
        "Photography & videography (4 hours)",
        "Guest management service"
      ] 
    },
    { 
      id: 3, 
      name: "Premium Package", 
      price: 799900, 
      services: [
        "Venue for up to 200 guests",
        "Gourmet plated dinner",
        "Luxury decoration & florals",
        "Live band & entertainment",
        "8-hour event duration",
        "Full-day photography & videography",
        "Dedicated event coordinator",
        "Transportation service",
        "Security service"
      ] 
    }
  ];

  const [deals, setDeals] = useState(initialDeals);
  const [editingDeal, setEditingDeal] = useState(null);
  const [editedDeal, setEditedDeal] = useState(null);

  const handleEditDeal = (deal) => {
    setEditingDeal(deal.id);
    setEditedDeal({ ...deal });
  };

  const handleUpdateDeal = (dealId) => {
    if (!editedDeal) return;
    
    setDeals(deals.map(deal => 
      deal.id === dealId ? editedDeal : deal
    ));
    setEditingDeal(null);
    setEditedDeal(null);
    toast.success("Deal package has been successfully updated.");
  };

  const handleCancelEdit = () => {
    setEditingDeal(null);
    setEditedDeal(null);
  };

  const updateEditedDeal = (field, value) => {
    if (!editedDeal) return;
    setEditedDeal({ ...editedDeal, [field]: value });
  };

  const addNewDeal = () => {
    const newId = Math.max(...deals.map(d => d.id)) + 1;
    const newDeal = {
      id: newId,
      name: "New Package",
      price: 500,
      services: ["Basic Service"]
    };
    setDeals([...deals, newDeal]);
    toast.success("New deal package has been added successfully.");
  };

  const removeDeal = (dealId) => {
    setDeals(deals.filter(deal => deal.id !== dealId));
    toast.success("Deal package has been removed successfully.");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Deals & Packages Management</h2>
      {deals.map((deal) => {
        const isEditing = editingDeal === deal.id;
        const currentDeal = isEditing ? editedDeal : deal;
        
        return (
          <Card key={deal.id} className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Package Name</Label>
                  <Input 
                    value={currentDeal.name}
                    onChange={(e) => updateEditedDeal('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label>Price (PKR)</Label>
                  <Input 
                    type="number" 
                    value={currentDeal.price}
                    onChange={(e) => updateEditedDeal('price', Number(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label>Included Services</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {currentDeal.services.map((service, idx) => (
                    <Badge key={idx} variant="outline">{service}</Badge>
                  ))}
                </div>
                {isEditing && (
                  <Input 
                    placeholder="Enter services separated by commas"
                    value={currentDeal.services.join(', ')}
                    onChange={(e) => updateEditedDeal('services', e.target.value.split(',').map(s => s.trim()))}
                  />
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={() => handleUpdateDeal(deal.id)}>Save Changes</Button>
                    <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditDeal(deal)}>Edit Package</Button>
                    <Button variant="destructive" onClick={() => removeDeal(deal.id)}>Remove Package</Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        );
      })}
      <Button onClick={addNewDeal}>Add New Package</Button>
    </div>
  );
};

export default DealsUpdateSection;