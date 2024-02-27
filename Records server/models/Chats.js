const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const ChatSchema = new mongoose.Schema({
Chatters:{type:[ObjectId],ref:"Member"}, //chatters can be 2,3,4,5,etc
RecentMessage:{type:ObjectId,ref:"Messages"},
initializedTime:{type:Date,default:Date.now},
});
module.exports = mongoose.model("Chats", ChatSchema);

