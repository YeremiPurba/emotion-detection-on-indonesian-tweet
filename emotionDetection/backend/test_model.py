import joblib

model = joblib.load("ml/best_model_svm.pkl")
tfidf = joblib.load("ml/tfidf_vectorizer.pkl")
encoder = joblib.load("ml/label_encoder.pkl")

print("Model :", type(model))
print("TF-IDF :", type(tfidf))
print("Label :", encoder.classes_)

text = "Saya sangat bahagia hari ini"

vector = tfidf.transform([text])
prediction = model.predict(vector)
emotion = encoder.inverse_transform(prediction)

print("Prediksi:", emotion[0])