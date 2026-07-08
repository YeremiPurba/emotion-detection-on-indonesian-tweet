## Setup dan Running Server

### 1. Navigasi ke folder backend
Buka terminal CMD, ketik baris perintah berikut:
```bash
cd emotionDetection/backend
```

### 2. Install Dependencies
Pada terminal CMD, ketik baris perintah berikut:
```bash
pip install -r requirements.txt
```
(Disarankan menggunakan Virtual Environment)

### 3. Konfigurasi Database
Buka `app/utils/config.py`. Isi `DATABASE_PASSWORD` dan `DATABASE_NAME` dengan password dan nama database yang kamu import sebelumnya.

### 4. Jalankan Server Backend
Masukkan perintah berikut ke terminal CMD:
```bash
uvicorn app.main:app --reload
```
Backend akan berjalan di: `http://127.0.0.1:8000`
