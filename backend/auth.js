const bcrypt = require('bcrypt');
const pool = require('./db');



const authenticateUser = async (id, fplname) => {
  try {
    // Query the database to check if the provided id and fplname match any records
    const query = 'SELECT id FROM players WHERE id = $1 AND fplname = $2';
    const values = [id, fplname];
    const result = await pool.query(query, values);

    // If a matching record is found, return the user's id
    if (result.rows.length > 0) {
      return result.rows[0].id;
    } else {
      // If no matching record is found, return null
      return null;
    }
  } catch (error) {
    console.log('Error authenticating user:', error);
    // Optionally handle the error further or rethrow it
    throw error;
  }
};


module.exports = { authenticateUser };
