from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    text = Column(String(1000), nullable=False)

    emotion = Column(String(50), nullable=False)

    confidence = Column(Float, nullable=False)

    # feedback user
    feedback = Column(String(20), nullable=True)

    # label hasil koreksi user
    correction = Column(String(50), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="history"
    )