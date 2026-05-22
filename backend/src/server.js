import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express"
import { inngest,functions } from './lib/inngest.js'
import { clerkMiddleware } from "@clerk/express";

const app = express();

// middleware
app.use(express.json());
//credential true meaning=>server allows a browser to include cokkies on request
app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(clerkMiddleware());//this add auth field to req object:req.auth();

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
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