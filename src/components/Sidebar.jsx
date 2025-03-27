import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    setIsOpen(false);
    navigate("/details", { replace: true }); // Ensure navigation triggers a re-render
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden p-2 bg-gray-800 text-white fixed top-4 left-4 z-50"
      >
        ☰
      </button>

      <div className={`fixed md:static top-0 left-0 h-full w-60 bg-gray-900 text-white p-5 transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <ul>
          <li className="p-3 hover:bg-gray-700 rounded">
            <button onClick={handleDetailsClick}>Details</button> 
          </li>
        </ul>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
