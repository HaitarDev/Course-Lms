import Stripe from "stripe";

export const stripe = new Stripe(process.env.API_STRIPE_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});
