import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data: { id } } = await axios.post('http://localhost:3000/api/stripe/checkout', { amount });

            const { error } = await stripe.redirectToCheckout({ sessionId: id });

            if (error) {
                setError(error.message);
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* <CardElement /> */}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : `Pay ${amount} Tk`}
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

const Checkout = () => {
    const location = useLocation();
    const { amount } = location.state || { amount: 0 };

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
        </Elements>
    );
};

export default Checkout;
