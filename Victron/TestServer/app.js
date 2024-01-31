const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
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
