from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user

from app.models.user import User
from app.models.history import History

from app.schemas.predict import PredictRequest, PredictResponse
from app.services.emotion_service import predict_emotion

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.post("/", response_model=PredictResponse)
def predict(
    data: PredictRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    emotion, confidence = predict_emotion(data.text)

    history = History(
        user_id=current_user.id,
        text=data.text,
        emotion=emotion,
        confidence=confidence,
        feedback=None,
        correction=None
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return PredictResponse(
        history_id=history.id,
        emotion=emotion,
        confidence=confidence
    )