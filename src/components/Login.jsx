import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("storage"));

      // Decode token to check role (simple decode, for production use a library like jwt-decode)
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role === 'ROLE_ADMIN') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="center-layout">
      <div className="auth-container">
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
