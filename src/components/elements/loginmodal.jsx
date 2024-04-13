import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { useContext } from "react";

const LoginModal = ({ isModalOpen, handleModalClose }) => {
  const [email, setEmail] = useState("");
  const { loggedIn, setLoggedIn } = useContext(MyContext);
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = async () => {
      const dateofcreation = new Date();
      const user_id = uuidv4();
      const response = await fetch(
        `https://flowy-backend.onrender.com/api/users/${
          signup ? "signup" : "login"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, dateofcreation, email, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("auth-token", data.token);
        setLoggedIn(true);
        handleModalClose();
      } else {
        alert("error -->" + data.message);
      }
    };
    login();
  };

  if (!isModalOpen) return null;
  const handleClick = () => {
    setSignup(!signup);
  };

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
        {signup ? <h2>SignUp</h2> : <h2>Login</h2>}
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
          {signup ? (
            <span
              style={{ margin: "5px", cursor: "pointer" }}
              onClick={handleClick}
            >
              Already signedup ? to login click here{" "}
            </span>
          ) : (
            <span
              style={{ margin: "5px", cursor: "pointer" }}
              onClick={handleClick}
            >
              New to Flowy ? to signup click here{" "}
            </span>
          )}
          <button type="submit" className="modalbutton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
