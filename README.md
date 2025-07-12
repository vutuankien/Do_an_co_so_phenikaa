<!-- @format -->

<h1 align="center">💄 Cosmetics Store Web Application</h1>

<p align="center">
A full-stack e-commerce platform for a cosmetics store, featuring a modern React frontend and a robust Node.js/Express backend. This project provides a complete shopping experience from product discovery to checkout.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### Frontend (React + Vite)

- 🎨 **Modern UI:** Responsive and beautiful interface built with Tailwind CSS.
- 🔍 **Product Discovery:** Advanced product listing, details, and search functionality.
- 🛒 **Shopping Cart:** Fully functional shopping cart and wishlist.
- 👤 **User Authentication:** Secure user login and registration using Firebase.
- 📝 **Content Pages:** Engaging blog and a store locator.
- 🔄 **State Management:** Efficient state management and seamless API integration.

### Backend (Node.js + Express)

- 🚀 **RESTful API:** Well-structured API for products, users, orders, and more.
- 🗄️ **Database:** MongoDB integration with Mongoose for data modeling.
- 🔐 **Security:** Robust authentication and authorization mechanisms.
- ☁️ **Image Handling:** Cloudinary integration for cloud-based image uploads and management.
- 🏗️ **Modular Architecture:** Clean and maintainable code with a modular structure (controllers, models, routes).

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Firebase Authentication
- **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
- **Image Storage:** Cloudinary

## 📂 Project Structure

A high-level overview of the project's directory structure.

```
backend/
  src/
    app/
      controllers/
      middlewares/
      models/
    config/
    helpers/
    public/
    resources/
    routes/
frontend/
  src/
    assets/
    components/
    login/
    pages/
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (see `.env.example` if available).
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables in `.env` (see sample in repo).
4. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Environment Variables

The frontend uses Firebase for authentication. Example `.env`:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Firebase
- **Backend:** Node.js, Express, MongoDB, Cloudinary

## License

This project is licensed under the MIT License.

---

Feel free to contribute or open issues for suggestions and improvements!
