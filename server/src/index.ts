import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DBconnect } from "./models";
import mainrouter from "./routes/index"

dotenv.config();
const app = express();

app.use(express.json());

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173', // Development
  'http://localhost:3000', // Alternative dev port
  'https://todo-fullsatck.vercel.app', // Your Vercel domain
  'https://todo-fullsatck.vercel.app/', // Your Vercel domain with trailing slash
  'https://todo-fullsatck-k1a8apmh9-gopavarapupandu-gmailcoms-projects.vercel.app', // Previous Vercel domain
  'https://todo-fullsatck-k1a8apmh9-gopavarapupandu-gmailcoms-projects.vercel.app/', // Previous Vercel domain with trailing slash
  'https://todo-fullsatck-gmtcdp6cu-gopavarapupandu-gmailcoms-projects.vercel.app', // Latest Vercel domain
  'https://todo-fullsatck-gmtcdp6cu-gopavarapupandu-gmailcoms-projects.vercel.app/', // Latest Vercel domain with trailing slash
  process.env.FRONTEND_URL // Environment variable for production
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any Vercel domain for this project
    if (origin.includes('todo-fullsatck') && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log the blocked origin for debugging
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use("/api/v1/todo/", mainrouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
  console.log(`Server started on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

DBconnect();
