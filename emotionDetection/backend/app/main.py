from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import User
from app.routers.user import router as user_router
from app.routers.auth import router as auth_router
from app.routers.history import router as history_router
from app.routers.predict import router as predict_router
from app.routers.feedback import router as feedback_router

try:
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
        print("✅ Berhasil terhubung ke MySQL")
except Exception as e:
    print("❌ Gagal terhubung ke MySQL")
    print(e)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Emotion Detection API",
    version="1.0.0"
)

# =======================
# CORS
# =======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =======================
# Routers
# =======================
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(history_router)
app.include_router(predict_router)
app.include_router(feedback_router)


@app.get("/")
def root():
    return {
        "message": "Emotion Detection Backend is Running!"
    }