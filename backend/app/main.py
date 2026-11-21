from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List

from app.config import get_settings
from app.database import get_db, check_database_connection, Base, engine
from app import models

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Attempt to create tables on startup if database is accessible
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables verified/created successfully.")
    except Exception as e:
        print(f"Notice: Database tables could not be initialized on startup: {e}")
    yield

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Python FastAPI backend connected to PostgreSQL, ready for Render deployment.",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas for starter endpoints
class ItemCreate(BaseModel):
    title: str
    description: Optional[str] = None

class ItemResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

@app.get("/")
def read_root():
    return {
        "name": settings.app_name,
        "status": "online",
        "docs_url": "/docs",
        "health_url": "/api/health"
    }

@app.get("/api/health")
def health_check():
    db_connected, db_message = check_database_connection()
    return {
        "status": "healthy" if db_connected else "degraded",
        "backend": "online",
        "database": "connected" if db_connected else "disconnected",
        "database_message": db_message,
        "environment": settings.environment,
    }

@app.get("/api/items", response_model=List[ItemResponse])
def get_items(db: Session = Depends(get_db)):
    try:
        return db.query(models.StarterItem).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.post("/api/items", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    try:
        db_item = models.StarterItem(title=item.title, description=item.description)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
