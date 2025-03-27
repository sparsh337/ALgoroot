import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

// Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: true,
};

// Reducer Function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Avoid unnecessary state updates
        if (!state.user || state.user.uid !== user.uid) {
          dispatch({ type: "LOGIN", payload: user });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, [state.user]); // Dependency added on state.user

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to Use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Logout Function
export const logoutUser = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
