import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "../api/axios";

export default function List() {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/user-list",
        {
          params: {
            page: page,
            limit: rowsPerPage,
          },
        }
      );

      const { data, lastPage, currentPage } = response.data;

      const formattedUsers = data.map((user, index) => ({
        srno: (currentPage - 1) * rowsPerPage + index + 1,
        id: user.id,
        name: user.name || "-",
        email: user.email || "-",
        phoneno: user.phoneNumber || "-",
        gender: user.gender || "-",
      }));

      setUsers(formattedUsers);
      setTotalPages(lastPage);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.message && error.message.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.post(
        `/user-delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    { title: "#", dataIndex: "srno", key: "srno" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneno", key: "phoneno" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Action",
      render: (row) => (
        <div className="flex gap-1 text-center justify-center">
          <button onClick={() => handleDelete(row.id)}>
            <Trash2 color="#ff0000" size={16} />
          </button>
        </div>
      ),
      key: "action",
      width: 90,
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg mt-14">
        <h3 className="text-defaulttextcolor text-[1.125rem] font-semibold">
          User List
        </h3>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-end mb-3 p-2">
          <Link
            to="/Stepperform"
            className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
          >
            Add
          </Link>
        </div>
        <Table
          cols={columns}
          data={users}
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          isTableLoading={loading}
        />
      </div>
    </Layout>
  );
}