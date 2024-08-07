require('dotenv').config()
const app = require("express")()
const express = require("express")
const {MongoConnection }= require('./db');
const cors = require('cors');
const Socket = require('./Socket/Socket');
const Port = 8000 || process.env.PORT;
const server = require('http').createServer(app)
//? To parse json data from body of request object
Socket(server)
app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173","https://flexzon.vercel.app"],
  credentials:true,
  
}))

app.use("/api/auth",require("./Routes/Member/Auth"))
app.use("/api/posts/write",require("./Routes/Posts/UploadPost"))
app.use("/api/posts/recommendations",require("./Routes/Posts/Recommendations"))
app.use("/api/posts",require("./Routes/Posts/ReadPosts"))
app.use("/api/posts/upload",require("./Routes/Posts/UploadPost"))
app.use("/api/search",require("./Routes/Search/Search"))
app.use("/api/topic",require("./Routes/Topic/CRUDTopic"))
app.use("/api/like",require("./Routes/Posts/Likes"))
app.use("/api/profile",require("./Routes/Member/ReadUserProfile"))
app.use("/api/save",require("./Routes/Posts/Save"))
app.use("/api/connections",require("./Routes/Member/FollowPattren"))
app.use("/api/comments",require("./Routes/Posts/Comments"))
app.use("/api/otp",require("./Routes/Member/OTP"))
app.use("/api/vote",require("./Routes/Member/PollnQVoting"))
app.use("/api/chats",require("./Routes/Chats/Chats"))
app.use("/api/chats/invites",require("./Routes/Chats/Invite"))
app.use("/api/notifications",require("./Routes/Notifications/Notifications"))




server.listen(Port, () => {
  console.log(`records server is listening on http://localhost:${Port}`);
});
MongoConnection()
