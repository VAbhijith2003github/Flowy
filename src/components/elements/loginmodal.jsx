import React, { useState } from "react";

const LoginModal = ({ isModalOpen, handleModalClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
    };
    login();
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <span
        className="close"
        onClick={handleModalClose}
        style={{ cursor: "pointer", fontSize: "25px" }}
      >
        &times;
      </span>
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="modalform">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <span style={{ margin: "5px" }}>New to Flowy ? register here </span>
          <button type="submit" className="modalbutton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
