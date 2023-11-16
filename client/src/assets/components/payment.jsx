import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [cardElement, setCardElement] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      const stripeInstance = await loadStripe('pk_test_51OCqBSIHMJDsY8j88LN9JLKg8pv9cpCgb7K0iVpns0sugelBGXK1LWtzHLciVNfe5elRq97LcTz3xnk1kcmb2zDk00xJySUXNk');
      setStripe(stripeInstance);

     
      const elements = stripeInstance.elements();
      const card = elements.create('card');
      setCardElement(card);
    };

    initStripe();
  }, []); 
  useEffect(() => {
   
    fetchClientSecret();
  }, []); 
  const fetchClientSecret = async () => {
    try {
    //   const items = [
    //     { id: 'item_1', name: 'Product A', quantity: 2, price: 500 },
    //     { id: 'item_2', name: 'Product B', quantity: 1, price: 750 },
    //   ];

      const response = await fetch('http://localhost:3001/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          currency: 'mxn',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
      console.log('Client Secret:', data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  const handlePayment = async () => {
    if (!clientSecret || !stripe || !cardElement) {
      console.error('Client secret, stripe, or card element is null. Aborting payment.');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      console.error('Error processing payment:', result.error.message);
    } else {
      console.log('Payment succeeded:', result.paymentIntent);
      window.alert('Payment succeeded:', result.paymentIntent);
    }
  };

  return (
    <>
    <div>
    <h2>Checkout</h2>
    
    <div id="card-element">

      {cardElement && (
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        
          {cardElement.mount('#card-element')}
        </div>
      )}
    </div>
   
    <button onClick={handlePayment}>Proceed to Payment</button>
  </div>
    </>
  );
};

export default CheckoutForm;
