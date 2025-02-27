import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

// Load Stripe with the public key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // Fetch clientSecret from the backend
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(
          "/.netlify/functions/create-payment-intent",
          { cart, shipping_fee, total_amount }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };

    createPaymentIntent();
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // Confirm payment using Stripe
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      // Clear cart and redirect after payment
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="grid place-items-center place-content-center bg-slate-900 m-24 p-12">
      {succeeded ? (
        <article className="bg-slate-600 p-4 text-white">
          <h4>Thank you!</h4>
          <h4>Your payment was successful.</h4>
          <h4>Redirecting to home page...</h4>
        </article>
      ) : (
        <article className="bg-slate-600 p-4 text-white">
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(total_amount)}</p>
          <p>Test Card: 4242 4242 4242 4242</p>
        </article>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-200 w-96 grid p-12">
        <CardElement
          options={{ style: { base: { fontSize: "16px" } } }}
          onChange={handleChange}
        />

        <button
          disabled={processing || disabled || succeeded}
          className="bg-slate-500 cursor-pointer"
        >
          {processing ? "Processing..." : "Pay"}
        </button>

        {error && <div className="card-error">{error}</div>}
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
