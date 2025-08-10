import { Router } from "express";
import { serve } from "inngest/express";
import { functions, inngest } from '../inngest/index.js';
import showRouter from "./showRoutes.js";
import bookingRouter from "./bookingRoutes.js";

const apiRouter = Router()

apiRouter.use('/inngest', serve({ client: inngest, functions}))
apiRouter.use('/show', showRouter)
apiRouter.use('/booking', bookingRouter)

export default apiRouter