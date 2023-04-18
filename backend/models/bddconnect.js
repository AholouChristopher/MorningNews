var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
}

mongoose.connect("mongodb+srv://admin:<Passwword>@morningnews.j8cfh.mongodb.net/?retryWrites=true&w=majority",
  options,
function(error){
  if (error){
    console.log(error);
  } else {
    console.log("connection ok")
  }
});
