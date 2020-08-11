const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;

// DB config
const db = require('./config/keys').MongoURI;

//passport config
require('./config/passport')(passport);

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongo db connected ...'))
  .catch((err) => console.log(err));

// EJS for views for config render purpose
app.use(expresslayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session middleware
app.use(
  session({
    secret: 'ourlittlesecret',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware init
app.use(passport.initialize());
app.use(passport.session());

//  connect flash
app.use(flash());

// Global var for flash msg - custom middleware. dipakai utk kirim flash message sesuai state saat sebelum redirect dilakukan, liat route user register.login ketika mid ini dipanggil. error flash mesage diambol dari _helper
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

app.listen(PORT, console.log(`server running on PORT ${PORT}`));
