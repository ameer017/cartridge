const express = require("express");
const connectDB = require("./helper/connection");
const userRoutes = require("./routes/users");
const { errorHandler, notFoundHandler } = require("./helper/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User Authentication API" });
});

app.use("/api/users", userRoutes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api/users`);
});
