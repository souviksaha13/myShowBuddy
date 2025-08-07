import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './configs/db.js';
import { authMiddleware } from './auth/auth.js';
import { serve } from "inngest/express";
import { functions, inngest } from './inngest/index.js';

const app = express();
const PORT = 3000;
dotenv.config()

// Middleware
app.use(express.json());
app.use(cors())
app.use(authMiddleware)

// DB Connections
await connectDB()

// API Routes
app.get('/', (req, res) => res.send('Server is live'))
app.use('/api/inngest', serve({ client: inngest, functions}))


app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`))