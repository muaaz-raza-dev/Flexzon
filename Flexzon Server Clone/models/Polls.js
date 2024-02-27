const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const PollsSchema = new mongoose.Schema({
author:{type:ObjectId,required:true,ref:"Member"},
title:{type:String,text:true},
options:{type:[{title:String,votes:{type:[{type:ObjectId,ref:"Member"}],default:[]} }]}
});
module.exports = mongoose.model("Polls", PollsSchema);