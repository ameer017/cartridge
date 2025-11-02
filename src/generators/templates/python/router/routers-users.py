from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import bcrypt
import jwt
from datetime import datetime, timedelta
import os

from app.models.user import User, get_db
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserLogin,
    UserResponse,
    TokenResponse
)

router = APIRouter()
security = HTTPBearer()

JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
JWT_ALGORITHM = "HS256"

def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> int:
    """Verify JWT token and return user ID"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("userId")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    # Hash password
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'),
        bcrypt.gensalt()
    ).decode('utf-8')
    
    # Create user
    db_user = User(
        email=user.email,
        password=hashed_password,
        name=user.name
    )
    
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    # Generate JWT token
    token = jwt.encode(
        {"userId": db_user.id, "exp": datetime.utcnow() + timedelta(days=7)},
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )
    
    return TokenResponse(
        message="User created successfully",
        token=token,
        user=UserResponse(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        )
    )

@router.post("/login", response_model=TokenResponse)
async def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    # Find user
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Check password
    if not bcrypt.checkpw(
        login_data.password.encode('utf-8'),
        user.password.encode('utf-8')
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Generate JWT token
    token = jwt.encode(
        {"userId": user.id, "exp": datetime.utcnow() + timedelta(days=7)},
        JWT_SECRET,
        algorithm=JWT_ALGORITHM
    )
    
    return TokenResponse(
        message="Login successful",
        token=token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            name=user.name,
            created_at=user.created_at,
            updated_at=user.updated_at
        )
    )

@router.get("/", response_model=list[UserResponse])
async def get_all_users(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    """Get all users (protected)"""
    users = db.query(User).all()
    return [UserResponse(
        id=u.id,
        email=u.email,
        name=u.name,
        created_at=u.created_at,
        updated_at=u.updated_at
    ) for u in users]

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    """Get user by ID (protected)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        created_at=user.created_at,
        updated_at=user.updated_at
    )

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    """Update user (protected)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user_update.email:
        user.email = user_update.email
    if user_update.name:
        user.name = user_update.name
    
    user.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(user)
    
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        created_at=user.created_at,
        updated_at=user.updated_at
    )

@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    """Delete user (protected)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}

