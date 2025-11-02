# NestJS User Authentication CRUD

This package includes a complete user authentication CRUD implementation for NestJS with TypeScript.

## Project Structure

```
.
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root application module
│   └── users/
│       ├── users.module.ts          # Users module definition
│       ├── users.controller.ts      # User controller (routes)
│       ├── users.service.ts         # User service (business logic)
│       ├── dto/
│       │   ├── create-user.dto.ts   # Create user DTO
│       │   └── update-user.dto.ts    # Update user DTO
│       └── entities/
│           └── user.entity.ts        # User entity/schema
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── nest-cli.json                    # NestJS CLI configuration
└── README.md                        # This file
```

## Files Generated

- `src/main.ts` - Application bootstrap and server startup
- `src/app.module.ts` - Root module with MongoDB connection
- `src/users/users.module.ts` - Users feature module
- `src/users/users.controller.ts` - User REST API controller
- `src/users/users.service.ts` - User business logic service
- `src/users/dto/create-user.dto.ts` - User creation data transfer object
- `src/users/dto/update-user.dto.ts` - User update data transfer object
- `src/users/entities/user.entity.ts` - User MongoDB entity/schema
- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript compiler configuration
- `nest-cli.json` - NestJS CLI configuration

## Setup Instructions

1. Install required dependencies:

```bash
npm install
```

2. Set environment variables:

Create a `.env` file in the root directory:

```
JWT_SECRET=your-secret-key-here-change-in-production
MONGODB_URI=mongodb://localhost:27017/user-auth-db
PORT=3000
```

3. Make sure MongoDB is running on your system

4. Start the application:

```bash
# Development mode (with watch mode)
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

- `POST /users/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /users/login` - Login user
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

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Example Usage

### Register a new user:
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login:
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get all users (protected):
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Typed JavaScript
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation
- **class-validator** - DTO validation
- **class-transformer** - Object transformation

## Development

- Build the project: `npm run build`
- Run tests: `npm run test`
- Format code: `npm run format`
- Lint code: `npm run lint`

## Authentication Guard

The generated code uses `@UseGuards(JwtAuthGuard)` for protected routes. You may need to create a JWT authentication guard:

Create `src/auth/jwt-auth.guard.ts`:

```typescript
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      request.userId = decoded.userId;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
```

Then import it in your users controller or create an auth module.
