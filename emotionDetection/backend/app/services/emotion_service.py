import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

model = joblib.load(BASE_DIR / "ml" / "best_model_svm.pkl")
tfidf = joblib.load(BASE_DIR / "ml" / "tfidf_vectorizer.pkl")
label_encoder = joblib.load(BASE_DIR / "ml" / "label_encoder.pkl")


def predict_emotion(text: str):
    vector = tfidf.transform([text])

    prediction = model.predict(vector)
    probabilities = model.predict_proba(vector)

    emotion = label_encoder.inverse_transform(prediction)[0]

    confidence = float(probabilities.max())

    return emotion, confidence