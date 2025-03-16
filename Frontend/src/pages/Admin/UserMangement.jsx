import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const UserManagement = ({ users }) => {
  const [updatedUsers, setUpdatedUsers] = useState(users || []);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    setUpdatedUsers(users || []);
  }, [users]);

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = updatedUsers ? updatedUsers.slice(indexOfFirstUser, indexOfLastUser) : [];
  const totalPages = updatedUsers ? Math.ceil(updatedUsers.length / usersPerPage) : 1;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  const handleBlock = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/blockUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      setUpdatedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, is_Blocked: !user.is_Blocked } : user
        )
      );
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      

      {/* Table */}
      <div className="col-span-3">
        <section className="container">
          <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                <tr>
                  <th className="px-6 py-3">Sl.No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Options</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user._id} className="bg-white border-b hover:bg-[#e8e8ff]">
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {indexOfFirstUser + index + 1}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBlock(user._id)}
                          className={`px-4 py-2 font-semibold text-white ${
                            user.is_Blocked ? "bg-green-500" : "bg-red-500"
                          } rounded hover:bg-yellow-500`}
                        >
                          {user.is_Blocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-900">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-primaryColor text-white px-3 py-2 rounded-md mr-2 disabled:opacity-50"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              {"<-"}
            </button>
            <span className="text-lg font-semibold">{currentPage} of {totalPages}</span>
          <button 
            className="bg-primaryColor text-white px-3 py-2 rounded-md ml-2 disabled:opacity-50" 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
          >
            {"->"}
          </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserManagement;
