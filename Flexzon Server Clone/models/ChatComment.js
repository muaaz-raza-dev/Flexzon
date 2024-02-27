const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatCommentSchema = new Schema({
  ChatId: { type: ObjectId, ref: "Chats" },
  MessageId: { type: ObjectId, ref: "Messages" },
  UserId: { type: ObjectId, ref: "Member" },
  Comment: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatComments", ChatCommentSchema);
