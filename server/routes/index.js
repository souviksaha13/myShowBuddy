import { Router } from "express";
import { serve } from "inngest/express";
import { functions, inngest } from '../inngest/index.js';
import showRouter from "./showRoutes.js";
import bookingRouter from "./bookingRoutes.js";
import adminRouter from "./adminRoutes.js";

const apiRouter = Router()

apiRouter.use('/inngest', serve({ client: inngest, functions}))
apiRouter.use('/show', showRouter)
apiRouter.use('/booking', bookingRouter)
apiRouter.use('/admin', adminRouter)

export default apiRouter