import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express"
import { inngest,functions } from './lib/inngest.js'
import { clerkMiddleware } from "@clerk/express";
import  chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js"

const app = express();

// middleware
app.use(express.json());

// 1. Specify your exact live frontend URL
const allowedOrigins = [
  "https://talent-iq-one-self.vercel.app", 
  "http://localhost:5173" // Keeps local testing working perfectly
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or postman/curl requests (no origin)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS Error: The origin ${origin} is not allowed access.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // 👈 CRITICAL: Allows Clerk authorization cookies to pass safely
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(clerkMiddleware());//this add auth field to req object:req.auth();

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat",chatRoutes);
app.use("/api/sessions",sessionRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success from api",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();