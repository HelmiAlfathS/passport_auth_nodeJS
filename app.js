const express = require('express');
const expresslayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 5000;

// EJS for views
app.use(expresslayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

app.listen(PORT, console.log(`server running on PORT ${PORT}`));
