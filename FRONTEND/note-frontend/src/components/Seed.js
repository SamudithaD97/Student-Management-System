var mongoose = require('mongoose');
var User = require('./models/user.model');

var MongoURL = "MONGO_URL";
mongoose.connect(MongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    , (err, db) => {
        if (err) return console.log(err);
        global.db = mongoose.connection;
        global.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    });

function addAdmin() {
    var user = new User({
        email: "admin@gmail.com",
        password: "admin",
        accountType: "admin"
    });
    user.setPassword(user.password);
    user.save();
}

addAdmin();