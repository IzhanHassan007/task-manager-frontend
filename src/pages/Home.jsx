import React from "react";
import { FiLayers, FiCheckCircle } from "react-icons/fi";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <FiLayers className="home-icon big-icon" />
      <h2>Task Management</h2>
      <p>
        <FiCheckCircle className="inline-icon" /> Welcome to your smart task manager.
        Organize your tasks easily & boost your productivity!
      </p>
    </div>
  );
}

export default Home;
