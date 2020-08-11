const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// DB config
const db = require('./config/keys').MongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongo db connected ...'))
  .catch((err) => console.log(err));

// EJS for views
app.use(expresslayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

app.listen(PORT, console.log(`server running on PORT ${PORT}`));
