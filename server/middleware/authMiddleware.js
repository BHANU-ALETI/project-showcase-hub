// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to protect routes by checking for a valid token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGciOiJI...")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload and attach it to the request object
      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ msg: "Not authorized, no token" });
  }
};

// Middleware to check for admin role
const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ msg: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
