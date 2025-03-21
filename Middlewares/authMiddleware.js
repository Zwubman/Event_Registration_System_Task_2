import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "authorization header is required." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "token not foun in cookie." });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Token has expired, please log in again." });
        }
        return res.status(403).json({ message: "Invalid or expired token." });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during token verification" });
  }
};

export const checkAdminRole = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid Credential." });
  }
};
