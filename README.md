# Brainly

A full-stack web application to save, organize, and share your favorite content from YouTube, Twitter, and more. Built with React, TypeScript, Express, and MongoDB.

## Features
- User authentication (signup/signin)
- Save links from YouTube, Twitter, etc.
- View and manage your saved content
- Share your entire content collection with a unique link
- Responsive, modern UI with Tailwind CSS

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Express, TypeScript, MongoDB, Mongoose

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/brainly.git
   cd brainly
   ```

2. **Install dependencies:**
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Configure environment variables:**
   - In `backend/config.ts`, set your MongoDB URI and JWT secret.
   - In `frontend/src/config.ts`, set your backend API URL.

4. **Start the backend server:**
   ```sh
   cd backend
   npm run dev
   ```

5. **Start the frontend app:**
   ```sh
   cd frontend
   npm run dev
   ```

6. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure
```
brainly/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

## License
This project is licensed under the MIT License.
