import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FiSave, FiEdit2 } from "react-icons/fi";
import "./Form.css";

const AddEditTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await api.get(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setForm(res.data);
        } catch (err) {
          console.error("Failed to fetch task:", err);
          toast.error("Failed to fetch task!");
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (id) {
        await api.put(`/tasks/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Task updated successfully!");
      } else {
        await api.post("/tasks", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Task added successfully!");
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save task!");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">
          {id ? <FiEdit2 /> : <FiSave />} {id ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              placeholder="Enter task title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write task details..."
              value={form.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate?.split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="save-btn">
            {id ? (
              <>
                <FiEdit2 size={18} /> Update Task
              </>
            ) : (
              <>
                <FiSave size={18} /> Save Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
