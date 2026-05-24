import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const { userId } = req.auth;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized - invalid token",
        });
      }

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId: userId });

      // auto create user if not found
      if (!user) {
        user = await User.create({
          clerkId: userId,
        });
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
];