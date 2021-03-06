const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const passport = require('passport');

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  // Grab form value
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
  }
  // When pass all validator
  else {
    const user = await User.findOne({ email: email });
    if (user) {
      errors.push({ msg: 'Email is already registered' });
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // Hashed password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          await newUser.save();
          req.flash('success_msg', 'you are now registered and can log in');
          res.redirect('/users/login');
        })
      );
    }
  }
});

// Implement passport strategy in LOGIN
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// LOGOUT
router.get('/logout', (req, res) => {
  // req.logout() ini salah satu method dari passport. mmantab
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
