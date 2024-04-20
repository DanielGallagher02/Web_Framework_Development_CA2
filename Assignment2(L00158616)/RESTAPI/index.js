const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./model/db.js'); 

var app = express();


// serves files in public folder
app.use(express.static('public'));
app.use(cors());
app.use(express.json());  // Ensure JSON bodies are parsed

//
// routes
//

// GET /teams - Fetch all teams from the database
app.get('/teams', (req, res) => {
  db.query('SELECT * FROM teams', (error, results, fields) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.json(results);
  });
});

// GET /players - Fetch all players from the database
app.get('/players', (req, res) => {
  db.query('SELECT * FROM players', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
  });
});

// GET /results - Fetch all results from the database
app.get('/results', (req, res) => {
  db.query('SELECT * FROM results', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
  });
});

// GET /results/:round - Fetch results filtered by round number
app.get('/results/:round', (req, res) => {
  const roundNumber = req.params.round;
  if (!/^[1-7]$/.test(roundNumber)) {  // Ensuring the round number is between 1 and 7
    return res.status(400).json({ message: 'Invalid round number.' });
  }

  const query = 'SELECT * FROM results WHERE round = ?'; // Correct SQL syntax
  db.query(query, [roundNumber], (error, results, fields) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error', error });
      }
      res.json(results);
  });
});

// POST /login - Handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (error, results, fields) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (results.length > 0) {
          // User authenticated successfully
          res.json({ message: 'Login successful', user: results[0] });
      } else {
          // No user found with the credentials provided
          res.status(401).json({ message: 'Login failed' });
      }
  });
});

// PUT /results/:id - Update a specific result
app.put('/results/:id', (req, res) => {
  const { id } = req.params;
  const resultData = req.body; // This should contain all fields you expect to update

  // Check for required fields
  if (!resultData.team1Score || !resultData.team2Score) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  const updateQuery = 'UPDATE results SET team1Score = ?, team2Score = ? WHERE id = ?';
  db.query(updateQuery, [resultData.team1Score, resultData.team2Score, id], (error, results) => {
      if (error) {
          console.error('Update error:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Result not found' });
      }
      res.json({ message: 'Result updated successfully' });
  });
});

// DELETE /results/:id - Delete a specific result
app.delete('/results/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM results WHERE id = ?';

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json({ message: 'Result deleted successfully' });
  });
});


// Server setup
var myServer = app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
