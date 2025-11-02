from fastapi import FastAPI
from app.routers.users import router as users_router
from app.models.user import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Authentication API", version="1.0.0")

# Include routers
app.include_router(users_router, prefix="/api/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Welcome to User Authentication API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

