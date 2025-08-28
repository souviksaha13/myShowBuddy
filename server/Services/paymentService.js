import { createStripeSession } from "./stripeService.js";

const PAYMENT_PROVIDER = process.env.PAYMENT_PROVIDER || 'stripe'


export const createPaymentSession = async ({ origin, showData, booking }) => {
    if(PAYMENT_PROVIDER === 'stripe') {
        return await createStripeSession({ origin, showData, booking });
    } 
    // else return other payment methods when we will include them
}