import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeliverySection = ({ onDeliveryChange, deliveryData }) => {
  const [deliveryType, setDeliveryType] = useState(deliveryData?.type || 'delivery');
  const [selectedAddress, setSelectedAddress] = useState(deliveryData?.address || '');
  const [selectedBranch, setSelectedBranch] = useState(deliveryData?.branch || '');
  const [selectedDate, setSelectedDate] = useState(deliveryData?.date || '');
  const [selectedTime, setSelectedTime] = useState(deliveryData?.time || '');
  const [deliveryFee, setDeliveryFee] = useState(deliveryData?.fee || 0);

  const addresses = [
    { value: 'home', label: '123 Main Street, Downtown, NY 10001', distance: '2.3 miles' },
    { value: 'office', label: '456 Business Ave, Corporate District, NY 10002', distance: '4.1 miles' },
    { value: 'new', label: 'Add New Address...', distance: null }
  ];

  const branches = [
    { value: 'downtown', label: 'Downtown Branch - 789 Baker St', hours: '8AM - 8PM' },
    { value: 'uptown', label: 'Uptown Branch - 321 Sweet Ave', hours: '9AM - 7PM' },
    { value: 'mall', label: 'Mall Location - 654 Shopping Blvd', hours: '10AM - 9PM' }
  ];

  const timeSlots = [
    { value: '09:00', label: '9:00 AM - 10:00 AM' },
    { value: '10:00', label: '10:00 AM - 11:00 AM' },
    { value: '11:00', label: '11:00 AM - 12:00 PM' },
    { value: '14:00', label: '2:00 PM - 3:00 PM' },
    { value: '15:00', label: '3:00 PM - 4:00 PM' },
    { value: '16:00', label: '4:00 PM - 5:00 PM' },
    { value: '17:00', label: '5:00 PM - 6:00 PM' }
  ];

  // Calculate delivery fee based on distance
  useEffect(() => {
    if (deliveryType === 'delivery' && selectedAddress) {
      const address = addresses?.find(addr => addr?.value === selectedAddress);
      if (address && address?.distance) {
        const distance = parseFloat(address?.distance);
        const fee = distance <= 3 ? 5.99 : distance <= 7 ? 8.99 : 12.99;
        setDeliveryFee(fee);
      }
    } else {
      setDeliveryFee(0);
    }
  }, [deliveryType, selectedAddress]);

  // Notify parent component of changes
  useEffect(() => {
    onDeliveryChange({
      type: deliveryType,
      address: selectedAddress,
      branch: selectedBranch,
      date: selectedDate,
      time: selectedTime,
      fee: deliveryFee
    });
  }, [deliveryType, selectedAddress, selectedBranch, selectedDate, selectedTime, deliveryFee]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Delivery Information
      </h3>
      {/* Delivery Type Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => setDeliveryType('delivery')}
          className={`p-4 rounded-lg border text-left transition-smooth ${
            deliveryType === 'delivery' ?'border-primary bg-accent text-primary' :'border-border bg-background hover:border-primary/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="Truck" size={20} />
            <div>
              <h4 className="font-medium">Home Delivery</h4>
              <p className="text-sm text-muted-foreground">Delivered to your door</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setDeliveryType('pickup')}
          className={`p-4 rounded-lg border text-left transition-smooth ${
            deliveryType === 'pickup' ?'border-primary bg-accent text-primary' :'border-border bg-background hover:border-primary/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} />
            <div>
              <h4 className="font-medium">Self Pickup</h4>
              <p className="text-sm text-muted-foreground">Pick up from store</p>
            </div>
          </div>
        </button>
      </div>
      {/* Delivery Address Selection */}
      {deliveryType === 'delivery' && (
        <div className="space-y-4 mb-6">
          <Select
            label="Delivery Address"
            options={addresses?.map(addr => ({
              value: addr?.value,
              label: addr?.label,
              description: addr?.distance ? `Distance: ${addr?.distance}` : null
            }))}
            value={selectedAddress}
            onChange={setSelectedAddress}
            placeholder="Select delivery address"
          />

          {selectedAddress === 'new' && (
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <Input
                label="Street Address"
                placeholder="Enter your street address"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="City"
                  placeholder="City"
                />
                <Input
                  label="ZIP Code"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          )}

          {selectedAddress && selectedAddress !== 'new' && (
            <div className="p-4 bg-accent/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Delivery Fee</p>
                  <p className="text-xs text-muted-foreground">
                    Based on distance from bakery
                  </p>
                </div>
                <p className="text-lg font-semibold text-primary">
                  ${deliveryFee?.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Google Maps Integration */}
          {selectedAddress && selectedAddress !== 'new' && (
            <div className="h-48 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Delivery Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
                className="border-0"
              />
            </div>
          )}
        </div>
      )}
      {/* Pickup Branch Selection */}
      {deliveryType === 'pickup' && (
        <div className="space-y-4 mb-6">
          <Select
            label="Pickup Location"
            options={branches?.map(branch => ({
              value: branch?.value,
              label: branch?.label,
              description: `Hours: ${branch?.hours}`
            }))}
            value={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="Select pickup location"
          />

          {selectedBranch && (
            <div className="h-48 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Pickup Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=40.7589,-73.9851&z=15&output=embed"
                className="border-0"
              />
            </div>
          )}
        </div>
      )}
      {/* Date and Time Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={deliveryType === 'delivery' ? 'Delivery Date' : 'Pickup Date'}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e?.target?.value)}
          min={getTomorrowDate()}
        />

        <Select
          label={deliveryType === 'delivery' ? 'Delivery Time' : 'Pickup Time'}
          options={timeSlots}
          value={selectedTime}
          onChange={setSelectedTime}
          placeholder="Select time slot"
          disabled={!selectedDate}
        />
      </div>
      {/* Special Instructions */}
      <div className="mt-4">
        <Input
          label="Special Instructions (Optional)"
          placeholder="Any special delivery instructions..."
          className="h-20"
        />
      </div>
    </div>
  );
};

export default DeliverySection;