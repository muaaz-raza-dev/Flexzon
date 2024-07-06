const mongoose= require("mongoose");
const { ObjectId } = require("mongodb");
const Invites = new mongoose.Schema({
    ChatId:{type:ObjectId,ref:"Chats"},
    InvitedMember:{type:ObjectId,ref:"Member"},
    InvitedBy:{type:ObjectId,ref:"Member"},
    InvitedAt:{type:Date,default:Date.now},
    Status:{type:String,enum:["Active","Expired","Declined"],default:"Active"}
})

module.exports=mongoose.model("Invites",Invites)



