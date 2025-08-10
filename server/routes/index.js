import { Router } from "express";
import { serve } from "inngest/express";
import { functions, inngest } from '../inngest/index.js';
import showRouter from "./showRoutes.js";
import bookingRouter from "./bookingRoutes.js";
import adminRouter from "./adminRoutes.js";
import userRouter from "./userRoutes.js";

const apiRouter = Router()

apiRouter.use('/inngest', serve({ client: inngest, functions}))
apiRouter.use('/show', showRouter)
apiRouter.use('/booking', bookingRouter)
apiRouter.use('/admin', adminRouter)
apiRouter.use('/user', userRouter)

export default apiRouter