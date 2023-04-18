var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: String,
  description: String,
  urlToImage: String,
  url: String,
});

var userSchema = mongoose.Schema({
   username: String,
   password: String,
   email: String,
   sel: String,
   token: String,
   articles: [articleSchema]
 });

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
