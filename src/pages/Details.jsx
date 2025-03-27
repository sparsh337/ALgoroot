import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";

const Details = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.loading && !state.user) {
      toast.warn("Please log in to access this page.");
      navigate("/login");
    }
  }, [state.loading, state.user, navigate]);

  if (state.loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar - Hidden on small screens, toggled with a menu */}
      <aside className="hidden md:block w-64">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4 md:p-6 overflow-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">User Data Table</h2>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Details;
