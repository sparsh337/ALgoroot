import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const DataTable = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Get logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Define table columns
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Age", accessor: "age" },
    ],
    []
  );

  // Filter data based on search input
  const filteredData = useMemo(() => {
    return users.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  // Delete logged-in user account
  const handleDeleteAccount = () => {
    toast.warning(
      "Are you sure you want to delete your account? This action cannot be undone.",
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        onClick: () => {
          // Proceed with deletion
          const updatedUsers = users.filter(user => user.email !== loggedInUser.email);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          localStorage.removeItem("loggedInUser"); // Remove session
          toast.success("Account deleted successfully!", { autoClose: 3000 });
          navigate("/login"); // Redirect to login
        },
      }
    );
  };

  // Table instance with sorting and pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 p-2 border rounded w-[70%] max-w-md"
      />

      {/* Table */}
      <div className="overflow-x-auto max-w-full">
        <table
          {...getTableProps()}
          className="w-full border-collapse border border-gray-300 text-sm md:text-base"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`p-2 border text-left cursor-pointer whitespace-nowrap ${
                      column.id === "id" ? "hidden max-[850px]:hidden" : ""
                    }`}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : " ⬍"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="text-left">
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={`p-2 border text-left truncate max-w-[150px] md:max-w-none ${
                          cell.column.id === "id" ? "hidden max-[850px]:hidden" : ""
                        }`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete Account Button for Logged-in User */}
      {loggedInUser && (
        <div className="mt-4 text-center">
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete My Account
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
