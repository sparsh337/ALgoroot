import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Details from "./pages/Details";
import { useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";  // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toastify CSS
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  return state.user ? children : <Navigate to="/login" />;
};

// Separate component to handle routes
const AppRoutes = () => {
  const location = useLocation(); // Get current route location

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Key forces React to remount Details when clicking it again */}
      <Route 
        path="/details" 
        element={<ProtectedRoute><Details key={location.key} /></ProtectedRoute>} 
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />  {/* ✅ Toast Setup */}
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import Details from "./pages/Details";
// import { useAuth } from "./context/AuthContext";
// import Signup from "./pages/Signup";
// import "./index.css";
// import "tailwindcss";

// const ProtectedRoute = ({ children }) => {
//   const { state } = useAuth();
//   return state.user ? children : <Navigate to="/login" />;
// };

// // Separate component to handle routes
// const AppRoutes = () => {
//   const location = useLocation(); // Get current route location

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
      
//       {/* Key forces React to remount Details when clicking it again */}
//       <Route 
//         path="/details" 
//         element={<ProtectedRoute><Details key={location.key} /></ProtectedRoute>} 
//       />

//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Details from "./pages/Details";
// import { useAuth } from "./context/AuthContext";
// import Signup from "./pages/Signup";
// import "./index.css";
// import "tailwindcss";

// const ProtectedRoute = ({ children }) => {
//   const { state } = useAuth();
//   return state.user ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} /> {/* Add this */}
//         <Route path="/details" element={<ProtectedRoute><Details /></ProtectedRoute>} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
