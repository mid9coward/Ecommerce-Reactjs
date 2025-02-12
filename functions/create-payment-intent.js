import dotenv from "dotenv"; // Load environment variables
import Stripe from "stripe"; // Import Stripe library

dotenv.config(); // Load .env variables

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY); // Use secret key

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    // Calculate the total order amount
    const calculateOrderAmount = () => shipping_fee + total_amount;

    // Create a Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
