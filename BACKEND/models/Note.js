const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title : {
        type : String,
        required : true //validation
    },
    description : {
        type : String,
        required : true //validation
    },
    ownerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

    
    

})

const Note = mongoose.model("Note",noteSchema);

module.exports = Note;