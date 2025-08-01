import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './router/notesRouter.js';
import { connectDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors';

const app = express();
dotenv.config();



app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(express.json());
app.use(ratelimiter)

app.use('/api/notes', notesRouter);

connectDB().then(()=>{
  app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
  });
})