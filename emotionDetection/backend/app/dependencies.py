from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.utils.security import (
    oauth2_scheme,
    verify_token
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Token tidak valid"
        )

    user = db.query(User).filter(
        User.id == int(payload["sub"])
    ).first()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User tidak ditemukan"
        )

    return user