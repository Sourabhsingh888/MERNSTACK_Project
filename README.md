# MERNSTACK_Project
Multi-Step User Profile Update Form

This is a full-stack MERN application for a multi-step user profile update form with dynamic fields, real-time validation, conditional logic, file upload, and MongoDB data handling.

📁 Folder Structure

.
├── client/     # React frontend
└── server/     # Node.js + Express backend

🚀 Features
Multi-step form with dynamic field rendering

Real-time validations (username availability, password strength)

Image upload (with preview & validation)

Gender and profession-specific inputs

Dependent dropdowns (Country → State → City)

Summary preview before submission

Password update form with validation

Data stored in MongoDB

Deployed on free-tier platforms


🖥️ Frontend (React)
📂 Location
/client

📦 Setup

cd client
npm install

▶️ Run
npm run dev 

🛠️ Notes
Uses Bootstrap for styling.

Axios is used for API communication.

Form reset and preview logic included.

Validations and conditional rendering handled without external form libraries.


🔧 Backend (Node.js + Express + MongoDB)
📂 Location
/server

📦 Setup
cd server
npm install

🔐 Environment Variables
Create a .env file inside /server with the following:
PORT=8080
MONGO_URI=your_mongodb_connection_string

▶️ Run
npm start

🛠️ Notes
Multer handles image uploads (JPG/PNG, max 2MB).

Uses bcrypt for password hashing and validation.

Countries, states, and cities are seeded from a JSON file to MongoDB.

Includes endpoints:

/api/users/submit — Save full form data

/api/users/check-username/:username — Check username availability

/api/users/update-password — Update password (with current password check)

/api/location/countries — Fetch all countries

/api/location/states/:countryId — Fetch states for country

/api/location/cities/:stateId — Fetch cities for state



