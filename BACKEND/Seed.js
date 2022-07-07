var mongoose = require("mongoose");
var User = require("./models/User");
require("dotenv").config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection Success!");
});

function addAdmin() {
  var user = new User({
    email: "admin@gmail.com",
    password: "admin",
    accountType: "admin",
  });

  user.save();
}

addAdmin();
