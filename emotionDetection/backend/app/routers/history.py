from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.history import History
from app.schemas.history import HistoryResponse

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/", response_model=list[HistoryResponse])
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history = (
        db.query(History)
        .filter(History.user_id == current_user.id)
        .order_by(History.created_at.desc())
        .all()
    )

    return history