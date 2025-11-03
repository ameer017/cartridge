const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("./errorHandler");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      throw new AuthenticationError("No token provided");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // If it's already an AppError, pass it through
    if (error.isOperational) {
      return next(error);
    }
    // Otherwise, wrap it as AuthenticationError
    next(new AuthenticationError("Invalid or expired token"));
  }
};
