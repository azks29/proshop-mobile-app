// import Stripe from "stripe";
// import { Router } from "express";
// import asyncHandler from "express-async-handler";
// const stripe = new Stripe(
//   "sk_test_51LdqLoL9sMNHp5hCgAvZQ9Jyzv3BOu8V7jRaq4jvVGchUjfpxi7oXvI4CRssfoHtfjJZAsEs1BkWHLtW1W7X5tpr00QW7auXCn"
// );

// const router = Router();

// router.post(
//   "/payment",
//   asyncHandler(async (req, res) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1099,
//       currency: "usd",
//       automatic_payment_methods: ["card"],
//     });
//     const clientSecret = paymentIntent.client_secret;

//     res.json({
//       clientSecret: clientSecret,
//     });
//   })
// );

// export default router;
