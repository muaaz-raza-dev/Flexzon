const app = require('express').Router();
const mongoose =require("mongoose")
const Member =require("../../models/Member");
const Posts = require('../../models/Posts');
const VerifyMember = require('../../middleware/VerifyMember');
app.get("/:id",async(req,res)=>{
    let id= req.params.id;

    let User =await Member.findById(id)
    .populate([
    "interests",
    "liked",]).populate({
      path:"followers",
      select:"avatar username Name"
    }).populate({
      path:"following",
      select:"avatar username Name"
    })
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


app.get("/viewer/:id",VerifyMember,async(req,res)=>{
   let id= req.params.id;
console.log("I am  calling");
   if (id!==req.AdminId) {
      await Member.findByIdAndUpdate( id,{$push:{profileViews:{viewer:req.AdminId, date: new Date()}}})
   }
   res.json({ success: true,  });
})


module.exports = app;
