const router = require("express").Router();
const { response } = require("express");
let Note = require("../models/Note");
var mongoose = require('mongoose');


//Add note
router.route("/add").post((req,res)=>{
    
    const title =(req.body.title);
    const description =req.body.description;
    const ownerId =req.body.ownerId;
    
    const newNote = new Note({
        title,
        description,
        ownerId
    })

    newNote.save().then(()=>{
        res.json("Note Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display note
router.route("/display/:id").get((req,res)=>{
    //promise
    Note.find({ownerId:req.params.id}).then((notes)=>{ 
        res.json(notes)
    }).catch((err)=>{
        console.log(err)
    })

})

//update note
router.route("/update/:id").put(async(req,res)=>{ //update by using async function 
    let NoteId =req.params.id;
   
    //using destructure
    const {title,description} =req.body;

    const updateNote ={
        title,
        description
    }
    //await function
    const update =await Note.findByIdAndUpdate(NoteId,updateNote).then(()=>{
         
        res.status(200).send({status: "Note updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error:err.message});

    })

    
})


//delete note
router.route("/delete/:id").delete(async(req,res)=>{
    let noteId =req.params.id;

    await Note.findByIdAndDelete(noteId).then(()=>{
       res.status(200).send({status:"Note Deleted"}); 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data",error:err.message});

    })
}) 


//find(get) 
router.route("/get/:id").get(async(req,res)=>{
    let noteId=req.params.id;
    const note=await Note.findById(noteId).then((results)=>{
        res.status(200).send({note:results}); 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get note",error:err.message});
    })
})

//findbyUserId
router.route("/find/:id").get(async(req,res)=>{
    
    const note=await Note.find({"ownerId":req.params.id}).then((results)=>{
        res.status(200).send({note:results}); 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get note",error:err.message});
    })
})








module.exports = router;