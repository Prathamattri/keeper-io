require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

mongoose.connect(process.env.URI,function(err){
    if(err) console.log(err);
    else console.log(`Connected to the database`);
});

const NotesSchema = new mongoose.Schema({
    title : String,
    content : String
});

const Notes = new mongoose.model("note",NotesSchema);


///////////////////////////////////////////HOME ROUTE MANAGEMENT////////////////////////////////////////////////
app.route("/")
.get(function(req,res){
    Notes.find({},function(err,results){
        if(!err)
            res.send(results);
        else
            res.send(err);
    })
})

.post(function(req,res){
    const title = req.body.title;
    const content = req.body.content;
    console.log(req.body);
    const Note1 = new Notes({
        title: title,
        content: content
    });
    Note1.save();
    res.send("Got data");
});

///////////////////////////////////////////////NOTE ROUTE MANAGEMENT//////////////////////////////////////////////////
app.route("/note/delete")
.post(function(req,res){
    const id = req.body.id;
    Notes.findOneAndDelete({_id: id},function(err,docs){
        if(err) res.send(err);
        else res.send(`Deleted note with id : ${id} successfully`);
    })
})

app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`);
})