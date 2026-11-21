from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base

class StarterItem(Base):
    """
    Starter model demonstrating SQLAlchemy integration with PostgreSQL.
    You can extend or replace this with your own application models.
    """
    __tablename__ = "starter_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
