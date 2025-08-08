import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Create all inngest functions here

// User creation
const syncUserCreation = inngest.createFunction(
    {id: 'sync-userCreation-from-clerk'},
    {event: 'clerk/user.created'},
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            // all the data types are visible in clerk -> webhooks -> testing -> user.created
            _id: id,
            email: email_addresses[0].email_address,
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
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            // all the data types are visible in clerk -> webhooks -> testing -> user.created
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url,
        }

        await User.findByIdAndUpdate(id, userData)
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [ syncUserCreation, syncUserDeletion, syncUserUpdation ];