# Cartridge SDK

A CLI tool that generates user authentication CRUD operations for your preferred backend framework.

## Installation

```bash
npm install cartridge
```

Or globally:

```bash
npm install -g cartridge
```

## Usage

After installation, run:

```bash
npx cartridge
```

Or if installed globally:

```bash
cartridge
```

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

ISC

