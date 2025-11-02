# Python (FastAPI) User Authentication CRUD

This package includes a complete user authentication CRUD implementation for Python using FastAPI.

## Project Structure

```
.
├── app/
│   ├── __init__.py                # Package initialization
│   ├── main.py                     # FastAPI application entry point
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py                 # User SQLAlchemy model
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── user.py                 # Pydantic schemas for validation
│   └── routers/
│       ├── __init__.py
│       └── users.py                # User router with CRUD operations
├── requirements.txt                # Python dependencies
├── package.json                    # Project metadata (optional)
└── README.md                       # This file
```

## Files Generated

- `app/main.py` - FastAPI application setup and server configuration
- `app/models/user.py` - SQLAlchemy user model and database session
- `app/schemas/user.py` - Pydantic schemas for request/response validation
- `app/routers/users.py` - User API router with all CRUD endpoints
- `requirements.txt` - Python package dependencies
- `package.json` - Project metadata (optional)

## Setup Instructions

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set environment variables (optional):

```bash
export JWT_SECRET=your-secret-key-here-change-in-production
export DATABASE_URL=sqlite:///./users.db
```

For PostgreSQL:

```bash
export DATABASE_URL=postgresql://user:password@localhost/dbname
```

For MySQL:

```bash
export DATABASE_URL=mysql://user:password@localhost/dbname
```

4. Run the application:

```bash
# Using Python directly
python app/main.py

# Using uvicorn (recommended for development)
uvicorn app.main:app --reload

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

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
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user

## Example Usage

### Register a new user:

```bash
curl -X POST "http://localhost:8000/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login:

```bash
curl -X POST "http://localhost:8000/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get all users (protected):

```bash
curl -X GET "http://localhost:8000/api/users" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## API Documentation

FastAPI automatically provides interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
  - Interactive API explorer with "Try it out" functionality
- **ReDoc**: `http://localhost:8000/redoc`
  - Beautiful, responsive API documentation

## Technologies Used

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **bcrypt** - Password hashing
- **PyJWT** - JSON Web Token implementation
- **Uvicorn** - ASGI server

## Database

By default, the application uses SQLite (`sqlite:///./users.db`). The database file will be created automatically on first run.

To use PostgreSQL or MySQL, update the `DATABASE_URL` environment variable and ensure the appropriate database driver is installed:

- PostgreSQL: `psycopg2-binary` (add to requirements.txt)
- MySQL: `pymysql` or `mysqlclient` (add to requirements.txt)

## Development

- The application runs in development mode with auto-reload using `--reload` flag
- All database tables are created automatically on startup
- JWT tokens expire after 7 days (configurable in `app/routers/users.py`)

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
