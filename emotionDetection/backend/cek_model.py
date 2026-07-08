import joblib

model = joblib.load("ml/best_model_svm.pkl")

print("Model berhasil di-load")
print(type(model))
print(model)