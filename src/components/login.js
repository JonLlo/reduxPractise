import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretCode, setSecretCode] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // Send a request to your backend server to authenticate the user
      const response = await fetch("/api/login", {
        method: "POST", // Change method to "POST"
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password }) // Send username as id and password as fplname
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
      console.log(error.message);
      alert(`bosh ${error.message}`);
    }
  };
  
  
  

  const handleLogout = () => {
    setIsAuthenticated(false);
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
