// get the packages we need
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

// connect to our database
mongoose.connect('mongodb://localhost:27017/users2');

// create our application
const app = express();

// use environment defined port or 3000
const port = process.env.PORT || 3000;

// create our express router
const router = express.Router();

// initial dummy route for testing
// http://localhost:3000/api
router.get('/', (req, res) => {
  res.json({message: 'a get request has been made to /api'});
});

// register all our routes with /api
app.use('/api', router);

// start the server
app.listen(port);
console.log(`server listening on port ${port}`);
