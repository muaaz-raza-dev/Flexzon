const app = require('express').Router();
const Member =require("../../models/Member");
const Posts = require('../../models/Posts');
app.get("/:id",async(req,res)=>{
    let id= req.params.id;
    let User =await Member.findById(id)
    .populate(["followers",
    "following",
    "interests",
    "liked",])
    .select(["-password","-saved","-liked","-interests","-__v"])
 
    let Post=await Posts.find({author:id,isDeleted:false,anonymous:false}).populate(["author","topic"]).sort({publishDate:-1})
 if (User._doc.gender.display ===false) {
    User._doc.gender=null
 }
 if (User._doc.contact.display ===false) {
    User._doc.contact=null
 }
 if (User._doc.dob.display ===false) {
    User._doc.dob=null
 }
    res.json({ success: true, payload: { ...User._doc, Posts: Post } });
})

module.exports = app;
