import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../state/auth/authSlice";
import { logout } from "../state/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState(null); // State variable to hold the secret code

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Dispatch the login action with username and password
    dispatch(login({ username, password }));
  };
  const handleLogout = () => {
    // Dispatch the login action with username and password
    dispatch(logout());
  };
  const randomise = () => {
    // Generate a random number between 0 and 100 (inclusive)
    const randomNumber = Math.floor(Math.random() * 10000000000000000);
    setSecretCode(randomNumber); // Example: 42
    // Dispatch your action or use the random number as needed
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
      ) : 
      (
        <div>
          <h2>Login to get a secret Code</h2>
          <input
            type="text"
            placeholder="fpl name
            "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="fpl ID"
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
