import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './router/notesRouter.js';
import { connectDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();

const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production'){
  app.use(cors({
    origin: 'http://localhost:5173',
  }))
}
app.use(express.json());
app.use(ratelimiter)

app.use('/api/notes', notesRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend","dist","index.html"))
  })
}


connectDB().then(()=>{
  app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
  });
})