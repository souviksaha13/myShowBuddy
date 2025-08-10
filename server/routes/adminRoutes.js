import { Router } from 'express'
import { protectAdmin } from '../middleware/auth.js'
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controllers/adminController.js'

const adminRouter = Router()

adminRouter.get('/isAdmin', protectAdmin, isAdmin)
adminRouter.get('/dashboardData', protectAdmin, getDashboardData)
adminRouter.get('/all-shows', protectAdmin, getAllShows)
adminRouter.get('/all-bookings', protectAdmin, getAllBookings)

export default adminRouter