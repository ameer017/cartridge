# Auth Pulse SDK

A CLI tool that generates user authentication CRUD operations for your preferred backend framework.

## Installation

```bash
npm install auth-pulse
```

Or use directly without installing:

```bash
npx auth-pulse
```

## Usage

Simply run the command in your project directory:

```bash
npx auth-pulse
```

Or if installed globally:

```bash
auth-pulse
```

The CLI will guide you through selecting your framework (Node.js, NestJS, or Python) and automatically generate all the necessary authentication CRUD files in your current directory. After generation, follow the on-screen instructions to install dependencies with your preferred package manager (npm, yarn, or pnpm).

## Features

- **Interactive CLI**: Choose your framework with arrow key navigation
- **Multiple Frameworks**: Support for Node.js, NestJS, and Python (FastAPI)
- **Complete CRUD Operations**: Full user authentication with register, login, and CRUD endpoints
- **JWT Authentication**: Secure token-based authentication included
- **Production Ready**: Clean, well-structured code following best practices

## Supported Frameworks

### Node.js (Express)
- Express routes and controllers
- Mongoose models
- JWT authentication middleware
- Password hashing with bcrypt

### NestJS
- TypeScript controllers, services, and modules
- MongoDB integration with Mongoose
- DTOs for request validation
- Entity classes

### Python (FastAPI)
- FastAPI routers and dependencies
- SQLAlchemy models
- Pydantic schemas
- JWT token authentication

## Generated Features

Each framework implementation includes:

- ✅ User registration
- ✅ User login with JWT tokens
- ✅ Get all users (protected)
- ✅ Get user by ID (protected)
- ✅ Update user (protected)
- ✅ Delete user (protected)
- ✅ Password hashing
- ✅ Authentication middleware/guards

## License

MIT

