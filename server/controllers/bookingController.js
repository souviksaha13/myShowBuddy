import axios from 'axios'
import dotenv from 'dotenv'
import Show from '../models/Show.js'
import Booking from '../models/Booking.js'
import { useId } from 'react'
import { createPaymentSession } from '../Services/paymentService.js'
import { inngest } from '../inngest/index.js'

// Function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId)
        if(!showData) return false

        const occupiedSeats = showData.occupiedSeats
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat])

        return !isAnySeatTaken
    } catch (error) {
        console.error(error)
        return false;
    }
}

export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body
        const { origin } = req.headers

        const isAvailable = await checkSeatsAvailability(showId, selectedSeats)
        if(!isAvailable) {
            return res.json({ success: false, message: "Selected seats are not available"})
        }
        
        // Get the show details
        const showData = await Show.findById(showId).populate('movie')

        // Create a new booking
        const booking = await Booking.create({
            user: useId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        // Modify selected seats 
        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId
        })

        showData.markModified('occupiedSeats')
        await showData.save()

        // Payment Gateway Initialization
        const sessionUrl = await createPaymentSession({origin, showData, booking})

        // Run Inngest Scheduler function to check payment status after 15mins
        await inngest.send({
            name: "app/checkpayment",
            data: {
                bookingId: booking._id.toString()
            }
        })
        res.json({ success: true, url: sessionUrl})
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}


// Get Occupied Seats
export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params
        const showData = await Show.findById(showId)
        const occupiedSeats = Object.keys(showData.occupiedSeats)
        res.json({ success: true, occupiedSeats })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
}