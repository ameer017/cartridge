const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  ConflictError,
  AuthenticationError,
  NotFoundError,
  asyncHandler,
} = require("../helper/errorHandler");

// Register a new user
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" }
  );

  res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
});

// Login user
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError("Invalid credentials");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get user by ID
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.json(user);
});

// Update user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Update user
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.json({
    message: "User updated successfully",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
});

// Delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.json({ message: "User deleted successfully" });
});
