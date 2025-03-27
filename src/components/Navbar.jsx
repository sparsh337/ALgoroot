// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { signOut, deleteUser } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { state, dispatch } = useAuth();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [alert, setAlert] = useState(null);
//   const navigate = useNavigate();

//   // Function to show alert and auto-hide after 3 seconds
//   const showAlert = (message, type) => {
//     setAlert({ message, type });
//     setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
//   };

//   // Logout Function
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       dispatch({ type: "LOGOUT" });
//       navigate("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       showAlert("Logout failed. Try again!", "error");
//     }
//   };

//   // Delete Account Function
//   const handleDeleteAccount = async () => {
//     if (!window.confirm("Are you sure you want to delete your account? This action is irreversible!")) {
//       return;
//     }
  
//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         showAlert("User not found. Please log in again.", "error");
//         return;
//       }
  
//       // Remove user from localStorage first
//       const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//       const updatedUsers = storedUsers.filter((u) => u.email !== user.email);
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
  
//       // Manually remove user from context BEFORE deleting
//       dispatch({ type: "LOGOUT" });
  
//       // Delete user from Firebase Auth
//       await deleteUser(user);
  
//       // Show success message
//       showAlert("Account deleted successfully!", "success");
  
//       // Delay navigation for user feedback
//       setTimeout(() => {
//         navigate("/signup"); // Navigate to signup without flicker
//       }, 2000);
//     } catch (error) {
//       console.error("Error deleting account:", error);
  
//       if (error.code === "auth/requires-recent-login") {
//         showAlert("Please log in again to delete your account.", "error");
//       } else {
//         showAlert("Failed to delete account. Please try again.", "error");
//       }
//     }
//   };
  
  

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md relative">
//       {/* Alert Message */}
//       {alert && (
//         <div className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg z-50 transition-opacity duration-500
//           ${alert.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
//           <span>{alert.message}</span>
//           <button onClick={() => setAlert(null)} className="ml-3 font-bold text-lg">×</button>
//         </div>
//       )}

//       {/* Logo */}
//       <h1 className="text-xl font-bold">ALGOROOT</h1>

//       {/* User Profile Dropdown */}
//       <div className="relative">
//         <button
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg focus:outline-none"
//         >
//           <span>{state.user?.displayName || "User"}</span>
//           <img
//             src={state.user?.photoURL || "https://via.placeholder.com/40"}
//             alt="User Avatar"
//             className="w-8 h-8 rounded-full object-cover border border-gray-500"
//           />
//         </button>

//         {/* Dropdown Menu */}
//         {isDropdownOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden z-50">
//             <div className="p-4 text-center border-b">
//               <p className="font-semibold">{state.user?.displayName || "N/A"}</p>
//               <p className="text-sm text-gray-600">{state.user?.email || "No Email"}</p>
//             </div>
//             <ul className="py-2">
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
//                 >
//                   Delete Account
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Alert Function (Using Tailwind)
  const showAlert = (message, type) => {
    alert(message); // Replace with a Tailwind-based alert component if needed
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Delete Account Function
  const handleDeleteAccount = async () => {
    // Store the toast ID so we can dismiss it later
    const toastId = toast.warn(
      <div className="text-center">
        <p className="mb-2 text-lg font-semibold text-red-600">
          Are you sure you want to delete your account?
        </p>
        <p className="text-sm text-gray-600">This action is irreversible.</p>
        <div className="flex justify-center gap-3 mt-3">
          {/* Yes Button: Deletes Account */}
          <button
            onClick={async () => {
              toast.dismiss(toastId); // Close the confirmation toast
  
              try {
                const user = auth.currentUser;
                if (!user) {
                  toast.error("User not found. Please log in again.");
                  return;
                }
  
                // Step 1: Remove user from local storage
                const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = storedUsers.filter((u) => u.email !== user.email);
                localStorage.setItem("users", JSON.stringify(updatedUsers));
  
                // Step 2: Remove user from state
                dispatch({ type: "LOGOUT" });
  
                // Step 3: Delete user from Firebase Auth
                await deleteUser(user);
  
                // Step 4: Show success message & redirect
                toast.success("Account deleted successfully!", { autoClose: 2000 });
  
                setTimeout(() => {
                  navigate("/signup");
                }, 1500);
              } catch (error) {
                console.error("Error deleting account:", error);
  
                if (error.code === "auth/requires-recent-login") {
                  toast.error("Please log in again to delete your account.");
                } else {
                  toast.error("Failed to delete account. Please try again.");
                }
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
  
          {/* Cancel Button: Closes Toast */}
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => toast.dismiss(toastId)} // Dismiss on cancel
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-xl font-bold">ALGOROOT</h1>

      {/* User Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg focus:outline-none"
        >
          <span>{state.user?.displayName || "User"}</span>
          <img
            src={state.user?.photoURL || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover border border-gray-500"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden z-50">
            <div className="p-4 text-center border-b">
              <p className="font-semibold">{state.user?.displayName || "N/A"}</p>
              <p className="text-sm text-gray-600">{state.user?.email || "No Email"}</p>
            </div>
            <ul className="py-2">
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Delete Account
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
