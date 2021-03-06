// get the packages we need
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');

// connect to our database
mongoose.connect('mongodb://localhost:27017/users2');

// create our application
const app = express();

// use the body-parser package in our app
app.use(bodyParser.urlencoded({
  extended: true
}));

// use environment defined port or 3000
const port = process.env.PORT || 3000;

// create our express router
const router = express.Router();

// initial dummy route for testing
// http://localhost:3000/api
router.get('/', (req, res) => {
  res.json({message: 'a get request has been made to /api'});
});

// create a roiute with the prefix /users
const allUsersRoute = router.route('/users');
// create a route with prefix /users/:user_id
const singleUserRoute = router.route('/users/:user_id');

// create an endpoint for /api/users for POSTs
allUsersRoute.post((req, res) => {

  // create a new instance of the user model
  const user = new User();

  // set the user properties coming from the post data
  // if none are given set property to an empty string
  user.username = req.body.username || '';
  user.password = req.body.password || '';
  user.firstname = req.body.firstname || '';
  user.lastname = req.body.lastname || '';
  user.address1 = req.body.address1 || '';
  user.address2 = req.body.address2 || '';
  user.city = req.body.city || '';
  user.state = req.body.state || '';
  user.zip = req.body.zip || '';
  user.age = req.body.age || '';

  // use mongoose's save method to
  // save the user to the mongoDB
  user.save((err) => {
    if (err) res.send(err);
    // if saved send user in response
    res.json(user);
  });
});

// create an endpoint for /api/users for GETs
allUsersRoute.get((req, res) => {

  // use mongoose's find method to fetch all users from the
  // User model
  User.find((err, users) => {
    if (err) res.send(err);
    // if saved send users in response
    res.json(users);
  });
});

// create an endpoint for /api/users/:user_id for GETs
singleUserRoute.get((req, res) => {

  // calling User model's findById method
  // passing in id from URL to fetch a specific user
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);

    // send user as json in response
    res.json(user);
  });
});

// create an endpoint for /api/users/:user_id for PUTs
// will update a user's data
singleUserRoute.put((req, res) => {

  // calling User model's findById method
  // passing in user_id from URL to fetch a specific user
  User.findById(req.params.user_id, (err, user) => {
    if (err) res.send(err);

    // update user's info with values passed in request
    // body
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.address1 = req.body.address1 || user.address1;
    user.address2 = req.body.address2 || user.address2;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.zip = req.body.zip || user.zip;
    user.age = req.body.age || user.age;

    // call mongoose's save method on the user model
    user.save((err) => {
      if (err) res.send(err);

      res.json(user);
    })
  })
});

// create an endpoint for /api/users/:user_id for DELETEs
// passing in user_id from URL to fetch a specific user
singleUserRoute.delete((req, res) => {

  // calling User model's findByIdAndRemove method passing in
  // the user_id from the URL
  User.findByIdAndRemove(req.params.user_id, (err, user) => {
    if (err) res.send(err);

    // if there is no error send a message in the response
    res.json({message: `user with id ${req.params.user_id} has been removed`});
  });
});

// register all our routes with /api
app.use('/api', router);

// start the server
app.listen(port);
console.log(`server listening on port ${port}`);
