const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const QuestionSchema = new mongoose.Schema({
author:{type:ObjectId,required:true,ref:"Member"},
title:{type:String,text:true},
options:{type:[{title:String,votes:[{type:ObjectId,ref:"Member"}],}]},
correct:String
});
module.exports = mongoose.model("Questions", QuestionSchema);