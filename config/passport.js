const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Bring User for comparison purpose later
const User = require('../models/Users');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          // Match User
          const user = await User.findOne({ email: email });

          if (!user) {
            // method done(err, user match or not(bool), optional) message jadi optional
            return done(null, false, { message: 'Email is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  // Serialize or deserialize.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
