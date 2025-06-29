import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css"; // ✅ Link your Register CSS file

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { username, email, password });
      const { user, token } = res.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || "Register failed");
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Get Register !! </button>
      </form>
    </div>
  );
};

export default Register;
