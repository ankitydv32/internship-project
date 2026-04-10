# Authentication System (Internship Project)

## Project Description

This is a full-stack user authentication system built using Node.js, Express, MongoDB, and React.
It allows users to register, log in, verify their email, and reset passwords securely.

---

## Features

* User Registration and Login
* JWT-based Authentication
* Email Verification
* Forgot and Reset Password
* Protected Routes (Dashboard access)

---

## Technologies Used

**Backend:** Node.js, Express, MongoDB
**Frontend:** React, Axios

---

## Project Structure

```
internship-project/
│
├── backend/
├── frontend/
└── README.md
```
🔹 Part 2 – User Management (Admin)
* Admin login access
* View all users
* Change user role (User ↔ Admin)
* Activate / Deactivate users
* Delete users
* Protected admin routes


### 🔹 Part 3 – Artwork Management (Admin)
* Add new artwork
* Edit artwork details
* Delete artwork
* Mark artwork as Sold / Available
* Hide / Show artwork
* Admin-only access control


## Features Added (Part 4)
- Artwork listing
- Search functionality
- Category filter
- Price filter
- Artwork detail page
- Image support
---

## How to Run the Project

### 1. Clone the Repository

```
git clone https://github.com/ankitydv32/internship-project.git
cd internship-project
```

### 2. Run Backend

```
cd backend
npm install
npm start
```

### 3. Run Frontend

```
cd frontend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```
---


## Author

Ankit Yadav
