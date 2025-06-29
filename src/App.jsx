import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEditTask from "./pages/AddEditTask";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      {/* Navbar will show on all pages */}
      <Navbar />

      {/* ToastContainer for react-toastify */}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddEditTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            <PrivateRoute>
              <AddEditTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
