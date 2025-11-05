# 🚗 Car Rental Full-Stack Application

A modern **Car Rental Web App** built with **MERN Stack (MongoDB, Express, React, Node.js)**.  
Users can search, book, and manage car rentals easily. The admin (owner) can manage car listings, bookings, and user details.

---

## ✨ Features

### 🧑‍💻 User Side
- 🔍 Search cars by location, pickup and return dates  
- 🚘 View available cars with image, price, and details  
- 📝 Book cars instantly  
- 👤 User authentication (Login / Register)  
- 📅 Booking history and status tracking  

### 👨‍💼 Owner/Admin Side
- 🚗 Add, edit, and delete car listings  
- 📊 View all bookings and user activity  
- 🧾 Image upload via ImageKit integration  
- 🔐 Protected routes for admin  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Media | ImageKit (for image hosting) |
| Deployment | Vercel (Frontend + Serverless Backend) |

---

## 📁 Project Structure

```
CarRental/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # App Pages
│   │   ├── assets/         # Images, Icons, Static Data
│   │   ├── context/        # App Context / State
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Backend (Express + MongoDB)
│   ├── configs/            # DB & ImageKit configuration
│   ├── controllers/        # Logic for routes
│   ├── middleware/         # Auth middlewares
│   ├── models/             # Mongoose Models
│   ├── routes/             # Express Routes
│   ├── .env.example
│   └── package.json
│
├── vercel.json             # Deployment config (for frontend + backend)
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/CarRental.git
cd CarRental
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:
```bash
VITE_BASE_URL=https://your-vercel-server.vercel.app
VITE_CURRENCY=₹
```

Run the frontend:
```bash
npm run dev
```

---

## 🚀 Deployment

### Frontend
- Deploy `/client` folder on **Vercel**

### Backend
- Deploy `/server` folder on **Vercel** as a separate project  
- Add your environment variables in Vercel Dashboard

### vercel.json (example)
```json
{
  "builds": [
    { "src": "server/index.js", "use": "@vercel/node" },
    { "src": "client/package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.js" },
    { "src": "/(.*)", "dest": "/client/dist/$1" }
  ]
}
```

---

## 📸 Screenshots
_Add screenshots of your UI (Home, Cars, Booking, Owner Dashboard)_

---

## 💡 Future Improvements
- 🧭 Add car tracking with Google Maps API  
- 🧾 Integrate payment gateway (Razorpay / Stripe)  
- 🗓️ Add booking calendar for owners  
- 📱 PWA support for mobile users  

---

## 👨‍💻 Author
**Shailesh Tiwari**  
🔗 [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)
