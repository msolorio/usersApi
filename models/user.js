// load required packages
const mongoose = require('mongoose');

// create a mongoose schema which maps to a mongoDB collection
// defines the shape of the documents / models within the collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  age: Number
});

// export the mongoose model User from the userSchema created
// models will be accessible as User from our server.js file
module.exports = mongoose.model('User', userSchema);
