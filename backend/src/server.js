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

app.use(
  cors({
    origin: "https://talent-iq-one-self.vercel.app", 
    credentials: true, // Allows your authentication cookies/sessions to travel safely
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
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