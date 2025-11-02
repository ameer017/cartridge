# Node.js User Authentication CRUD

This package includes a complete user authentication CRUD implementation for Node.js with Express.

## Project Structure

```
.
├── index.js                      # Main application entry point
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment variables template
├── routes/
│   └── users.js                  # User routes definition
├── controllers/
│   └── userController.js         # User controller with all CRUD operations
├── models/
│   └── User.js                   # User Mongoose model
├── helper/
│   ├── connection.js             # MongoDB connection setup
│   └── middleware-auth.js        # JWT authentication middleware
└── README.md                     # This file
```

## Files Generated

- `index.js` - Express server setup with MongoDB connection
- `package.json` - Project dependencies and npm scripts
- `.env.example` - Environment variables template
- `routes/users.js` - User API routes
- `controllers/userController.js` - User business logic (register, login, CRUD)
- `models/User.js` - Mongoose user schema
- `helper/connection.js` - Database connection handler
- `middleware/auth.js` - JWT token verification middleware

## Setup Instructions

1. Install required dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update `.env` with your values:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-auth-db
JWT_SECRET=your-secret-key-here-change-in-production
```

3. Make sure MongoDB is running on your system

4. Start the server:

```bash
# Development mode with nodemon (auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

- `POST /api/users/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/users/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Protected Endpoints

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Example Usage

### Register a new user:
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get all users (protected):
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation
- **dotenv** - Environment variable management
