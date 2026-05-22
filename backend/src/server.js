import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";

const app = express();

// middleware
app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "success from api",
  });
});

app.listen(ENV.PORT, () => {
  console.log(`backend is running on port ${ENV.PORT}`);
});