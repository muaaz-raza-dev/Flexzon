const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const NotificationSchema = new mongoose.Schema({
    Reciever:{type:ObjectId,ref:"Member"},//who recieve notification
    type:String,
    message:String,
    read:{type:Boolean,default:false}, //is the notifcation is seen by user or not 
    NotificationIncludedUser:{type:ObjectId,ref:"Member"}, //who cause notification
    NotificationIncludedPost:{type:ObjectId,ref:"Posts"}, //who cause notification
    notifiedTime:{type:Date,default:Date.now}
    });
module.exports = mongoose.model("Notifications", NotificationSchema);