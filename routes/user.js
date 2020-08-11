const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // ----- Validation ---------
  // Check required field, every fields must be required
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'please fill all field',
    });
  }

  // cek password match and length
  if (password !== password2) {
    errors.push({
      msg: 'Password doesnt match',
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Password should be at least 6 characters',
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    res.send('pass');
  }
});
module.exports = router;
