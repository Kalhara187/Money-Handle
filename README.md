# 💰 Money Handle - Personal Finance Management System

<div align="center">

![Money Handle Banner](https://img.shields.io/badge/Money-Handle-blue?style=for-the-badge&logo=wallet)

**Transform Your Financial Future with Smart Money Management** 🚀

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

![GitHub stars](https://img.shields.io/github/stars/Kalhara187/Money-Handle?style=social)
![GitHub forks](https://img.shields.io/github/forks/Kalhara187/Money-Handle?style=social)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Kalhara187.Money-Handle)

</div>

---

---

## 🌟 Key Features

### 💳 **Comprehensive Financial Management**
- 📊 **Real-time Budget Tracking** - Monitor income and expenses instantly with live updates
- 💰 **Savings Goal Planning** - Set, track, and achieve your financial targets
- 📈 **Investment Calculator** - Calculate returns and plan smart investments
- 💳 **Loan & Mortgage Calculator** - Compute monthly payments, interest, and amortization
- 📅 **Bill Reminders** - Never miss a payment with intelligent notifications

### 🤖 **AI-Powered MoneyBot Assistant**
- 🧠 **Intelligent Chatbot** - Your 24/7 financial companion with natural language processing
- 💬 **Smart Conversations** - Ask questions in plain English about your finances
- 🎯 **Personalized Advice** - Custom recommendations based on your financial profile
- 🔮 **Predictive Analytics** - AI-powered insights to optimize your spending
- ⚡ **Quick Actions** - One-click access to common financial calculations

### 🔐 **Security & Authentication**
- 🔒 **JWT Authentication** - Industry-standard secure user sessions
- 🛡️ **Password Encryption** - Bcrypt hashing with salt rounds
- 👤 **User Profiles** - Personalized dashboard for each user
- 🔑 **Session Management** - Automatic token refresh and expiry
- 🚫 **Rate Limiting** - Protection against brute force attacks

### 🎨 **Modern UI/UX Design**
- 🌈 **Beautiful Gradients** - Eye-catching visual interface with smooth animations
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Optimized with Vite for instant load times
- 🎭 **Smooth Animations** - Delightful micro-interactions throughout
- 🎨 **Customizable Themes** - Personalize your experience

### 📊 **Advanced Dashboard**
- 📈 **Financial Visualizations** - Interactive charts and graphs
- 💵 **Income Tracking** - Manage multiple income sources
- 🧾 **Expense Categories** - Organize spending by category
- 📊 **Financial Reports** - Generate detailed insights
- 🎯 **Goal Progress** - Visual tracking of savings goals

## Performance

Money-Handle is optimized for high performance and fast user experiences:

- **Fast Development Server**: Powered by Vite, providing instant hot module replacement (HMR) for rapid development
- **Optimized Builds**: Vite's build process creates highly optimized production bundles with code splitting and tree shaking
- **Efficient React Rendering**: Built with React 19, utilizing modern rendering techniques for smooth UI interactions
- **Lightweight Dependencies**: Minimal bundle size through careful selection of lightweight libraries
- **Database Optimization**: MongoDB with Mongoose provides fast data retrieval and storage
- **API Rate Limiting**: Implemented to prevent abuse and ensure consistent performance under load
- **Caching Strategies**: JWT tokens and session management reduce server load for authenticated requests

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
