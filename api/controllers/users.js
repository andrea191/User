var util = require('util');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String
});

userSchema.methods.speak = function (){
	var greeting = this.name 
		? "Hello, my name is " + this.name
		: "Hello, I'm a stranger";
	console.log(greeting);
}

var User = mongoose.model('User', userSchema);

module.exports = {
  getUsersAndHello: getUsers,
  getUserAndHello: getUserByName,
  postUser: addUser,
  deleteUser: removeUser
};

function getUsers(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  console.log(req.swagger.params);
  User.find(function(err,users){
    if (err) {
      res.json(err);
      return console.error(err)
    };
    console.log(users);
    var phrase = new Array();
    phrase[0] = "Hello, my name is " + users[0].name;
    phrase[1] = "Hello, my name is " + users[1].name;
    phrase[2] = "Hello, my name is " + users[2].name;
    phrase[3] = "Hello, my name is " + users[3].name;
    phrase[4] = "Hello, my name is " + users[4].name;
    phrase[5] = "Hello, my name is " + users[5].name;
    console.log(phrase);
    res.json(phrase);
  })
}

function getUserByName(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  console.log(req.swagger.params.name.value);
  console.log("I'M HERE!");
  var getName = req.swagger.params.name.value;
  User.findOne({name: getName}, function(err,user){
    if (err) {
      res.json(err);
      return console.error(err)
    };
    if (user) {
      var phrase = "Hello, my name is " + user.name;
    } else{
      var phrase = "Hello, none has this name";
    };
    console.log(phrase);
    console.log(typeof phrase);
    res.json(phrase);
  })
};

function addUser(req, res){
  var addName = req.body.name;
  console.log(addName);
  User.create({name: addName}, function(err, user){
    if (err) {
      throw err;
    }
    console.log(user);
    console.log(typeof user.name);
    var phrase = user.name + " is added!";
    //res.json(phrase);
    res.json();
  })
}

function removeUser(req, res){
  var removeName = req.swagger.params.name.value;
  User.remove({name: removeName}, function(err){
    if (err) {
      return handleError(err);
    }
    console.log(removeName + " is deleted!");
    res.json();
  })
}
