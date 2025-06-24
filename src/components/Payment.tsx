
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, CreditCard, Shield, Star } from 'lucide-react';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plans = {
    monthly: {
      price: 7.50,
      period: 'month',
      total: 7.50,
      savings: null,
    },
    annual: {
      price: 6.75,
      period: 'month',
      total: 81.00,
      savings: 9.00,
      originalTotal: 90.00,
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];

  const handlePayment = () => {
    // Mock payment processing
    console.log('Processing payment for:', selectedPlan, 'plan');
    alert(`Mock payment processing for ${selectedPlan} plan - £${currentPlan.total}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your CarerPassport Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Keep your documents organized and easily share them with care agencies. 
          Choose the plan that works best for you.
        </p>
      </div>

      {/* Plan Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly Plan */}
        <Card className={`relative cursor-pointer transition-all ${
          selectedPlan === 'monthly' ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
        }`}>
          <div className="absolute top-4 right-4">
            {selectedPlan === 'monthly' && (
              <CheckCircle className="w-6 h-6 text-blue-500" />
            )}
          </div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Monthly Plan
              <Badge variant="outline">Popular</Badge>
            </CardTitle>
            <CardDescription>
              Perfect for getting started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                £{plans.monthly.price.toFixed(2)}
              </div>
              <div className="text-gray-600">per month</div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Document storage & management
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Share with unlimited agencies
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Expiry notifications
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Mobile app access
              </li>
            </ul>
            <Button 
              variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setSelectedPlan('monthly')}
            >
              {selectedPlan === 'monthly' ? 'Selected' : 'Select Monthly'}
            </Button>
          </CardContent>
        </Card>

        {/* Annual Plan */}
        <Card className={`relative cursor-pointer transition-all ${
          selectedPlan === 'annual' ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
        }`}>
          <div className="absolute top-4 right-4">
            {selectedPlan === 'annual' && (
              <CheckCircle className="w-6 h-6 text-blue-500" />
            )}
          </div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-green-500 hover:bg-green-600">
              <Star className="w-3 h-3 mr-1" />
              Save 10%
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Annual Plan
              <Badge variant="secondary">Best Value</Badge>
            </CardTitle>
            <CardDescription>
              Save money with yearly billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                £{plans.annual.price.toFixed(2)}
              </div>
              <div className="text-gray-600">per month</div>
              <div className="text-sm text-green-600 font-medium mt-1">
                Save £{plans.annual.savings?.toFixed(2)} per year
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Everything in Monthly plan
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Priority customer support
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Advanced analytics
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                10% annual savings
              </li>
            </ul>
            <Button 
              variant={selectedPlan === 'annual' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => setSelectedPlan('annual')}
            >
              {selectedPlan === 'annual' ? 'Selected' : 'Select Annual'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Details
          </CardTitle>
          <CardDescription>
            Your payment information is secure and encrypted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Credit/Debit Card
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Card Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input 
                id="expiryDate" 
                placeholder="MM/YY" 
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                placeholder="123" 
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input 
                id="cardName" 
                placeholder="John Smith" 
                className="mt-1"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>CarerPassport {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'} Plan</span>
                <span>£{selectedPlan === 'annual' ? currentPlan.total.toFixed(2) : currentPlan.price.toFixed(2)}</span>
              </div>
              {selectedPlan === 'annual' && (
                <div className="flex justify-between text-green-600 text-sm">
                  <span>Annual savings</span>
                  <span>-£{currentPlan.savings?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total {selectedPlan === 'annual' ? '(billed annually)' : '(monthly)'}</span>
                <span>£{currentPlan.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-500 mr-3" />
            <div className="text-sm text-blue-700">
              Your payment is secured with 256-bit SSL encryption. 
              We never store your card details.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handlePayment}
              className="flex-1"
              size="lg"
            >
              Subscribe Now - £{currentPlan.total.toFixed(2)}
            </Button>
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
