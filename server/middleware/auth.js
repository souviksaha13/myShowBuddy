import { clerkClient } from "@clerk/express"

// middleware to ensure only admin can go forward (api is protected only for admins)
export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = req.auth()

        const user = await clerkClient.users.getUser(userId)
        
        if(user.privateMetadata.role !== 'admin') {
            return res.json({ success: false, message: "not authorized" })
        }

        next()
    } catch (error) {
        return res.json({ success: false, message: "not authorized" })
    }
}