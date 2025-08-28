import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
    const signature = req.headers["stripe-signature"]

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOKS_SECRET)
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })

                const session = sessionList.data[0]
                const { bookingId } = session.metadata

                await Booking.findByIdAndUpdate(bookingId, {
                    isPaid: true,
                    paymentLink: ""
                })

                break;
            }
                
            default:
                console.error('Unhandled event type: ', event.type)
        }

        res.json({received: true})
    } catch (error) {
        console.error("Webhook processing error: ", error)
        res.status(500).send("Internal Server error")
    }
}