import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { data: { id } } = await axios.post('http://localhost:3000/api/stripe/checkout', { amount });

        const { error } = await stripe.redirectToCheckout({ sessionId: id });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

const Checkout = ({ amount }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
    </Elements>
);

export default Checkout;
