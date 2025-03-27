React Firebase Authentication App

This is a React.js application with Firebase Authentication and a dashboard featuring a data table with sorting, filtering, and pagination.

Features

🔐 User Authentication (Login & Signup) with Firebase

🏠 Dashboard with user details

🔍 Search, Sort & Pagination in the data table

🔄 State Management using useReducer & useContext

📦 Firestore Integration for storing user data

🎨 Responsive UI for both desktop & mobile

📂 Session Persistence using Firebase Auth

🚀 Deployed on Vercel

🚀 Installation & Setup

1. Clone the Repository
   git clone https://github.com/your-username/your-repo.gitcd your-repo

2. Install Dependencies
   npm install

3. Configure Firebase
Create a .env file in the root directory and add your Firebase config:
VITE_API_KEY=your-api-key
VITE_AUTH_DOMAIN=your-auth-domain
VITE_PROJECT_ID=your-project-id
VITE_STORAGE_BUCKET=your-storage-bucket
VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_APP_ID=your-app-id

4. Start Development Server
   npm run dev
   Runs the app on http://localhost:5173/.

📂 Project Structure
.
├── src
│   ├── components  # Reusable UI components (Navbar, Sidebar, DataTable)
│   ├── context     # AuthContext for state management
│   ├── pages       # Pages (Login, Signup, Details)
│   ├── firebaseConfig.js  # Firebase configuration
│   ├── App.jsx     # Main app entry point
│   ├── index.css   # Global styles
│
├── .env            # Firebase credentials (DO NOT SHARE)
├── .gitignore      # Ignore node_modules, .env
├── package.json    # Dependencies & scripts
└── README.md       # Documentation

🛠️ Deployment

Deploy on Vercel

Push your project to GitHub.

Go to Vercel Dashboard → New Project.

Select your GitHub repo.

Set up Environment Variables from .env.

Deploy! 🎉


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

📜 License

This project is MIT licensed.
