import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "wouter";

enum CheckoutStep {
  CART_REVIEW = 0,
  SHIPPING_INFO = 1,
  PAYMENT = 2,
  CONFIRMATION = 3
}

const Checkout = () => {
  const { cartItems, cartTotal, removeFromCart, updateCartItemQuantity } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.CART_REVIEW);
  const [, navigate] = useLocation();

  // If cart is empty, redirect to products page
  if (cartItems.length === 0 && currentStep === CheckoutStep.CART_REVIEW) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-serif font-medium mb-6">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
          <Button 
            onClick={() => navigate("/products")}
            className="px-8 py-3"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const handleProceedToShipping = () => {
    setCurrentStep(CheckoutStep.SHIPPING_INFO);
    window.scrollTo(0, 0);
  };

  const handleBackToCart = () => {
    setCurrentStep(CheckoutStep.CART_REVIEW);
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = () => {
    setCurrentStep(CheckoutStep.PAYMENT);
    window.scrollTo(0, 0);
  };

  const handleBackToShipping = () => {
    setCurrentStep(CheckoutStep.SHIPPING_INFO);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    setCurrentStep(CheckoutStep.CONFIRMATION);
    window.scrollTo(0, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= CheckoutStep.CART_REVIEW ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className="text-sm ml-2">Cart</div>
        </div>
        <div className={`w-16 h-1 mx-2 ${currentStep >= CheckoutStep.SHIPPING_INFO ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= CheckoutStep.SHIPPING_INFO ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className="text-sm ml-2">Shipping</div>
        </div>
        <div className={`w-16 h-1 mx-2 ${currentStep >= CheckoutStep.PAYMENT ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= CheckoutStep.PAYMENT ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
          <div className="text-sm ml-2">Payment</div>
        </div>
        <div className={`w-16 h-1 mx-2 ${currentStep >= CheckoutStep.CONFIRMATION ? 'bg-primary' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= CheckoutStep.CONFIRMATION ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
            4
          </div>
          <div className="text-sm ml-2">Confirmation</div>
        </div>
      </div>
    );
  };

  const renderCartReview = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-2xl font-serif font-medium mb-4">Review Your Cart</h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
                  <div className="w-24 h-32 overflow-hidden rounded-md flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.size && `Size: ${item.size}`} 
                      {item.size && item.color && " | "} 
                      {item.color && `Color: ${item.color}`}
                    </p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                      >
                        -
                      </button>
                      <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-600 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-serif font-medium mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>{formatPrice(cartTotal * 0.18)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(cartTotal * 1.18)}</span>
              </div>
              <Button 
                onClick={handleProceedToShipping}
                className="w-full mt-4"
              >
                Proceed to Shipping
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/products")}
                className="w-full mt-2"
              >
                Continue Shopping
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderShippingInfo = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-2xl font-serif font-medium mb-4">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input 
                  type="text" 
                  id="address" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    type="text" 
                    id="state" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    id="zip" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select 
                  id="country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row justify-between pt-4 space-y-2 md:space-y-0">
                <Button 
                  variant="outline"
                  onClick={handleBackToCart}
                >
                  Back to Cart
                </Button>
                <Button 
                  onClick={handleProceedToPayment}
                >
                  Continue to Payment
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-serif font-medium mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>{formatPrice(cartTotal * 0.18)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(cartTotal * 1.18)}</span>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Items in Cart</h3>
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}-summary`} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderPayment = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-2xl font-serif font-medium mb-4">Payment Method</h2>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-md p-4">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="paymentMethod" value="card" className="mr-2" defaultChecked />
                    <span>Credit/Debit Card</span>
                  </label>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          id="expiry" 
                          placeholder="MM/YY"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input 
                          type="text" 
                          id="cvv" 
                          placeholder="123"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input 
                        type="text" 
                        id="nameOnCard" 
                        placeholder="John Doe"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-md p-4">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="paymentMethod" value="paypal" className="mr-2" />
                    <span>PayPal</span>
                  </label>
                </div>
                <div className="border border-gray-300 rounded-md p-4">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="paymentMethod" value="upi" className="mr-2" />
                    <span>UPI Payment</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between pt-4 space-y-2 md:space-y-0">
                <Button 
                  variant="outline"
                  onClick={handleBackToShipping}
                >
                  Back to Shipping
                </Button>
                <Button 
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-serif font-medium mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>{formatPrice(cartTotal * 0.18)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(cartTotal * 1.18)}</span>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Items in Cart</h3>
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}-payment`} className="flex justify-between text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderOrderConfirmation = () => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-medium mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is now being processed.
          </p>
          <div className="bg-gray-50 p-4 rounded-md inline-block mb-6">
            <p className="font-medium">Order Number</p>
            <p className="text-2xl font-serif">{orderNumber}</p>
          </div>
          <div className="space-y-4 mb-8">
            <h3 className="font-medium text-left">Order Details</h3>
            <div className="border-t border-b py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}-confirm`} className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 overflow-hidden rounded-md mr-4">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.size && `Size: ${item.size}`} 
                          {item.size && item.color && " | "} 
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>{formatPrice(cartTotal * 0.18)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>{formatPrice(cartTotal * 1.18)}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
            <Button 
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-serif font-medium mb-6 text-center">Checkout</h1>
      
      {/* Step indicator */}
      {renderStepIndicator()}
      
      {/* Content based on current step */}
      {currentStep === CheckoutStep.CART_REVIEW && renderCartReview()}
      {currentStep === CheckoutStep.SHIPPING_INFO && renderShippingInfo()}
      {currentStep === CheckoutStep.PAYMENT && renderPayment()}
      {currentStep === CheckoutStep.CONFIRMATION && renderOrderConfirmation()}
    </div>
  );
};

export default Checkout;