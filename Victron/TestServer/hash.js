const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Please provide a password to hash.');
} else {
  const saltRounds = 10; // You can adjust the number of salt rounds
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
    } else {
      console.log('Bcrypt hash:', hash);
    }
  });
}
