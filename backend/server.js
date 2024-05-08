const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const { authenticateUser, hashPassword } = require('./auth');
const pool = require('./db');

app.use(express.json());



app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('Connected to database:', res.rows[0].now);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { id, fplname } = req.body;

    // Authenticate the user
    const userId = await authenticateUser(id, fplname);

    if (userId) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
