import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../services/api";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiSearch } from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [logout, navigate]);

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0a58ca",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        Swal.fire("Deleted!", "The task has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete task:", err);
        Swal.fire("Error", "Failed to delete task.", "error");
      }
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) =>
      statusFilter === "all" ? true : task.status === statusFilter
    );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>📋 Dashboard</h2>
        <h3>
          Welcome, <span>{user?.username || "User"}</span>!
        </h3>
      </header>

      <Link className="add-task-btn" to="/add-task">
        <FiPlus size={18} style={{ marginRight: 8 }} />
        Add New Task
      </Link>

      <div className="search-filter-bar">
        <div className="search-bar">
          <FiSearch size={16} style={{ marginRight: 6 }} />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <section className="task-section">
        <h3>Your Tasks</h3>

        {loading ? (
          <p>Loading tasks…</p>
        ) : filteredTasks.length ? (
          <ul>
            {filteredTasks.map((task) => (
              <li
                key={task._id}
                className={isOverdue(task.dueDate) ? "overdue-task" : ""}
              >
                <div>
                  <strong>{task.title}</strong>
                  <span className={`status-badge ${task.status.replace(" ", "-")}`}>
                    {task.status}
                  </span>
                  {isOverdue(task.dueDate) && (
                    <span className="overdue-label">Overdue!</span>
                  )}
                </div>

                <div className="task-actions">
                  <Link to={`/edit/${task._id}`}>
                    <FiEdit2 size={16} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(task._id)}>
                    <FiTrash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found.</p>
        )}
      </section>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut size={18} style={{ marginRight: 6 }} />
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
