from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.user import User
from app.models.history import History

from app.schemas.feedback import FeedbackRequest

router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
)


@router.post("/")
def save_feedback(
    data: FeedbackRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    history = (
        db.query(History)
        .filter(
            History.id == data.history_id,
            History.user_id == current_user.id
        )
        .first()
    )

    if history is None:
        raise HTTPException(
            status_code=404,
            detail="History tidak ditemukan"
        )

    history.feedback = data.feedback
    history.correction = data.correction

    db.commit()

    return {
        "message": "Feedback berhasil disimpan"
    }