const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const hashedPassword = process.env.HASHED_PASSWORD;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample user data (replace this with your database)
const users = [
  {
    id: 1,
    username: 'yolanda',
    password: hashedPassword,
  },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    console.log('Password comparison successful');
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '30d' });
    res.json({ token });
  } else {
    console.log('Password comparison failed');
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});

app.post('/settings', authenticateToken, async (req, res) => {
  const settings = req.body;
  try {
    if (settings !== undefined && settings !== null) {
      console.log('Settings Received');
      await writeToFile(fileName, settings);

      res.json({ settings });
    } else {
      console.log('Invalid settings data received');
      res.status(400).json({ error: 'Invalid settings data' });
    }
  } catch (error) {
    handleServerError(res, error, 'Settings Save FAIL:');
  }
});


app.get('/getSettings', authenticateToken, async (req, res) => {
  try {
    console.log('Settings being sent');
    let savedData = await readFromFile(fileName);
    res.json(savedData);
  } catch (error) {
    handleServerError(res, error, 'Settings Sent FAIL:');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  // Extract token without the 'Bearer ' prefix
  const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Token is not valid or expired' });
    }

    req.user = user;
    next();
  });
}
const fileName = 'users.json'

async function writeToFile(file, data) {
  try {
    let settings = JSON.stringify(data);
    await fs.promises.writeFile(file, settings);
    console.log('Settings successfully written to file');
  } catch (error) {
    console.error('Error writing to file:', error);
    throw error;
  }
}

async function readFromFile(file) {
  try {
    let rawdata = await fs.promises.readFile(file);
    let savedSettings = JSON.parse(rawdata);
    console.log('Settings successfully read from file');
    return savedSettings;
  } catch (error) {
    console.error('Error reading from file:', error);
    throw error;
  }
}
function handleServerError(res, error, errorMessage) {
  console.error(errorMessage, error);
  res.status(500).json({ error: 'Internal Server Error' });
}