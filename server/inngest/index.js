import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import dotenv, { populate } from "dotenv";
import sendEmail from "../Services/nodemailer.js";

dotenv.config();

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "movie-ticket-booking",
    eventKey: process.env.INNGEST_EVENT_KEY,
});

// Create all inngest functions here

// User creation
const syncUserCreation = inngest.createFunction(
    {id: 'sync-userCreation-from-clerk'},
    {event: 'clerk/user.created'},
    async ({ event }) => {
        const { id, username, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            // all the data types are visible in clerk -> webhooks -> testing -> user.created
            _id: id,
            email: email_addresses[0].email_address,
            username: username,
            name: first_name + ' ' + last_name,
            image: image_url,
        }

        await User.create(userData)
    }
)


// Delete user
const syncUserDeletion = inngest.createFunction(
    {id: 'sync-userDeletion-from-clerk'},
    {event: 'clerk/user.deleted'},
    async ({ event }) => {
        const { id } = event.data
        await User.findByIdAndDelete(id)
    }
)


// Update user data
const syncUserUpdation = inngest.createFunction(
    {id: 'sync-userUpdation-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({ event }) => {
        const { id, first_name, username, last_name, email_addresses, image_url } = event.data
        const userData = {
            // all the data types are visible in clerk -> webhooks -> testing -> user.created
            _id: id,
            email: email_addresses[0].email_address,
            username: username,
            name: first_name + ' ' + last_name,
            image: image_url,
        }

        await User.findByIdAndUpdate(id, userData)
    }
)


// Inngest function to cancel booking and release seats of shows after 15 mins of booking created if payment is not made
const releaseSeatsAndDeleteBooking = inngest.createFunction(
    {id: 'release-seats-delete-booking'},
    {event: 'app/checkpayment'},
    async ({ event, step }) => {
        const fifteenMinsLater = new Date(Date.now() + 15*60*1000)
        await step.sleepUntil('wait-for-15-mins', fifteenMinsLater);

        await step.run('check-payment-status', async () => {
            const bookingId = event.data.bookingId;
            const booking = await Booking.findById(bookingId)

            // If payment is not made, release the seats and delete booking
            if(!booking.isPaid) {
                const show = await Show.findById(booking.show)
                booking.bookedSeats.forEach((seat) => {
                    delete show.occupiedSeats[seat]
                })
                show.markModified('occupiedSeats')
                await show.save()
                await Booking.findByIdAndDelete(booking._id)
            }
        })
    }
)


// Inngest Function to send email when user books a show
const sendBookingConfirmationEmail = inngest.createFunction(
    {id: 'send-booking-confirmation-email'},
    {event: "app/show.booked"},
    async ({ event, step }) => {
        const { bookingId } = event.data;

        const booking = Booking.findById(bookingId).populate({
            path: 'show',
            populate: {path: 'movie', model: "Movie"}
        }).populate('user')
        
        await sendEmail({
            to: booking.user.email,
            subject: `Payment confirmation: "${booking.show.movie.title}" booked`,
            body:  `<div style="font-family: Arial, sans-sarif; line-height: 1.5;">
                        <h2>Hi ${booking.user.name}</h2>
                        <p>Your booking fro <strong style="color: #F84565;">"${booking.show.movie.title}"</strong> is confirmed. </p>

                        <p>
                            <strong>Date: </strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })} <br/>
                            <strong>Time: </strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}
                        </p>
                        <p>Enjoy the Show!!</p>
                        <p>Thanks for booking with us! <br/>- myShowBuddy Team</p>
                    </div>
            `
        })
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [ syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeatsAndDeleteBooking, sendBookingConfirmationEmail ];