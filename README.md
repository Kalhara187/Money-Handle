# Money-Handle

A comprehensive financial management application built with React and Node.js, designed to help users track income, manage expenses, and gain AI-powered financial insights.

## Features

- **User Authentication**: Secure sign-in and sign-up with JWT-based authentication
- **Dashboard**: Interactive dashboard with financial statistics and visualizations
- **Income Tracker**: Track and manage various income sources
- **AI Financial Insights**: Get personalized financial advice powered by AI
- **AI Chatbot**: Interactive chatbot for financial queries and assistance
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Admin Dashboard**: Administrative features for managing users and data

## Tech Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing for navigation
- **Lucide React**: Beautiful icons for the UI

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing for security

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/money-handle.git
   cd money-handle
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/money-handle
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## Project Structure

```
money-handle/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   ├── public/
│   └── package.json
├── README.md
└── TODO.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please open an issue on GitHub.
