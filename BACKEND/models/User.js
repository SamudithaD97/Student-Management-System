const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstName : {
        type : String,
        required : true //validation
    },
    lastName : {
        type : String,
        required : true //validation
    },
    email : {
        type : String,
        required : true //validation
    },
    dateOfBirth : {
        type : Date,
        required : true //validation
    },
    mobile : {
        type : Number,
        required : true //validation
    },
    status : {
        type : Boolean,
        required : true //validation
    },
    password : {
        type : String,
        required : true //validation
    },
    accountType : {
        type : String,
        required : true //validation
    },
    notes: [{type: mongoose.Schema.ObjectId, ref: 'Note'}],


})

const User = mongoose.model("User",userSchema);

module.exports = User;