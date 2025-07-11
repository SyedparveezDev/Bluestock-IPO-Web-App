# 📊 Bluestock IPO Web App

Production-level Django web application + REST API to manage & display IPO data  
Built for Bluestock Fintech interns, following real-world best practices.

---

## 🚀 **Features**
✅ Public website:
- List IPOs (upcoming, ongoing, listed)
- IPO detail page
- Download RHP & DRHP PDFs

✅ Admin panel:
- Login protected
- CRUD IPOs
- Upload logos, PDFs

✅ REST API (with search/filter):
- `/api/ipo/`
- `/api/ipo/<id>/`

---

## 🛠 **Tech stack**
| Layer     | Technology                           |
|----------|--------------------------------------|
| Backend  | Python 3.12, Django 5.0.6, DRF 3.15  |
| Frontend | HTML, CSS, Bootstrap 5, JavaScript   |
| DB       | PostgreSQL (default: SQLite for dev) |

---

## 📦 **Project structure**
```plaintext
ipo_project/
├── manage.py
├── ipo_project/
│   └── settings.py, urls.py, ...
├── ipo_app/
│   ├── models.py, views.py, urls.py, ...
│   └── templates/home.html, detail.html
├── media/
└── static/
