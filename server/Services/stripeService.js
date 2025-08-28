import Stripe from 'stripe'

// Initialize stripe gateway
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)



export const createStripeSession = async ({ origin, showData, booking }) => {
    const line_items = [{
        price_data: {
            currency: 'inr',
            product_data: {
                name: showData.movie.title
            },
            unit_amount: Math.floor(booking.amount) * 100
        },
        quantity: 1
    }]

    const session =  await stripeInstance.checkout.sessions.create({
        success_url: `${origin}/loading/my-bookings`,
        cancel_url: `${origin}/my-bookings`,
        line_items: line_items,
        mode: 'payment',
        metadata: {
            bookingId: booking._id.toString(),
        },
        expires_at: Math.floor(Date.now() / 1000) + 30*60   // 30 mins from now
    })

    booking.paymentLink = session.url
    await booking.save()

    return session.url
}