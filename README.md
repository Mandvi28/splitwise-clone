# Splitwise Clone - Shared Expenses App

## 📌 Project Overview
This is a simplified Splitwise-style full stack application that allows users to:

- Create accounts and login
- Create groups
- Add members to groups
- Add and manage shared expenses
- Split expenses equally
- Track balances between users
- Record settlements

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Django
- Django REST Framework (DRF)
- JWT Authentication (SimpleJWT)

### Database
- PostgreSQL

---

## 🚀 Features Implemented

- User Registration & Login (JWT Auth)
- Group Creation & Management
- Add/Remove Group Members
- Expense Creation API
- Equal Split Expense Logic
- ExpenseSplit tracking in DB
- Admin panel for verification

---

## ⚙️ Setup Instructions

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver