# Bluestock IPO Web App

A full-stack web application to manage IPO listings, user participation, and analytics. Built with **React** for the frontend and **Django** for the backend.

---

## 🚀 Features

- User authentication and registration
- Admin dashboard to add/manage IPOs
- Users can view, apply, and track IPOs
- Real-time analytics & charts (e.g., participation trends)
- REST API for frontend-backend integration
- Responsive UI design

---

## 🛠 Tech Stack

| Layer      | Technology |
|-----------:|-----------|
| Frontend   | React, Axios, React Router, Bootstrap/Tailwind |
| Backend    | Django, Django REST Framework |
| Database   | SQLite (dev), can be switched to PostgreSQL/MySQL |
| Others     | JWT / Session auth, static files, templates |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (>= 14.x)
- Python 3.8+
- pip / virtualenv


### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/Bluestock-IPO-Web-App.git
cd Bluestock-IPO-Web-App
```


### 2️⃣ Setup Backend (Django)
```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt

# Run migrations and start server
python manage.py migrate
python manage.py runserver
```


### 3️⃣ Setup Frontend (React)
```bash
cd frontend
npm install
npm start
```

The React app will run on [http://localhost:3000](http://localhost:3000) and Django backend on [http://127.0.0.1:8000](http://127.0.0.1:8000).


---

## ⚙️ Environment Variables

Create `.env` files in both frontend and backend if needed. Example:

#### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

#### Backend (`backend/.env` or use Django settings)
```
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///db.sqlite3
```

---

## 📊 Usage

- Visit the React app to register/login
- Admin users can create IPOs from the Django admin panel or a custom dashboard
- Users can view available IPOs and apply
- View charts & reports for participation

---

## 📦 Folder Structure (suggested)

```
Bluestock-IPO-Web-App/
├── backend/
│   ├── manage.py
│   ├── ipo/ (Django app)
│   ├── users/ (Django app)
│   ├── requirements.txt
│   └── db.sqlite3
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/
└── README.md
```

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Create a pull request


---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.

---

## 📬 Contact

Made with ❤️ by [Syed Parveez Afham](https://github.com/SyedparveezDev)  
For any query, email: Syedparveezdevlop@gmail.com

> **Tip:** You can customize this README by adding screenshots, deployment instructions, or CI/CD badges.