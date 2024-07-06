const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const CommentsSchema = new mongoose.Schema({
sender:{type:ObjectId,ref:"Member"},
receiver:{type:ObjectId,ref:"Member"},
content:String,
delivered:{type:Date,default:Date.now},
chatId:{type:ObjectId,ref:"Chats"},
read:{type:[ObjectId],default:[] ,ref:"Members"},
Comments:{type:[ObjectId],default:[] ,ref:"ChatComments"}
});
module.exports = mongoose.model("Messages", CommentsSchema);

