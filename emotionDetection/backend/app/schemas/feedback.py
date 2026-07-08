from pydantic import BaseModel


class FeedbackRequest(BaseModel):
    history_id: int
    feedback: str
    correction: str | None = None