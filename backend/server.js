const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const { authenticateUser } = require('./auth');
const pool = require('./db');


app.use(express.json());
app.get('/', (req, res) => {
  // Send the index.html file from the build directory
  res.sendFile(path.join(__dirname, './src/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Error executing query', err);
    // Handle the error here if necessary
  } else {
    console.log('Connected to database:', result.rows[0].now);
  }
});

// Change from '/login' to '/api/login'
app.post("/api/login", async (req, res) => {
  try {
    const { id, fplname } = req.body;

    // Authenticate the user
    const userId = await authenticateUser(id, fplname);

    if (userId) {
      // Send a JSON response for successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Send a JSON response for invalid username or password
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Error logging in:', error);
    // Send a JSON response for internal server error
    res.status(500).json({ message: 'Internal server error!' });
  }
});

