from datetime import datetime
from pydantic import BaseModel


class HistoryResponse(BaseModel):
    id: int
    text: str
    emotion: str
    confidence: float
    feedback: str | None
    correction: str | None
    created_at: datetime


    class Config:
        from_attributes = True