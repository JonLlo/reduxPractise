import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [secretCode, setSecretCode] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // Send a request to your backend server to authenticate the user
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST", // Change method to "POST"
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: username, fplname: password }) // Send username as id and password as fplname
      });
  
      if (!response.ok) {
        // Handle non-OK response status here
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else {
        alert('camea');
      }
  
      const data = await response.json();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("We have an error:", error);
      alert(`bosh ${error.message}`);
    }
  };
  
  
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSecretCode(null);
    dispatch(logout()); // Dispatch the logout action
  };

  const randomise = () => {
    // Generate and display the secret code
    setSecretCode(Math.floor(Math.random() * 10000000000000000));
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>You are logged in.</p>
          <p>The secret code is: {secretCode}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={randomise}>rerandomise</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
