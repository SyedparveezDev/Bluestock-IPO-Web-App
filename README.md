# Bluestock IPO Web App 🚀

Production-level Django app + REST API showing IPO data.

## ✅ Features
- List upcoming, ongoing, listed IPOs
- Detail page, download PDFs
- Django REST API
- PostgreSQL database
- Admin to manage data

## 🧩 Tech
- Django 5.0.6
- DRF 3.15.1
- Bootstrap 5
- PostgreSQL

## 🚀 Setup (local)
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
