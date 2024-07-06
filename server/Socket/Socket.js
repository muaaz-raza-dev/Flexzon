const { Server } = require('socket.io');
const Member = require('../models/Member');
const Socket = (server) => {
    let ConnectedUsers = {}
    const io = new Server(server,{
        cors:{origin:["http://localhost:5173","https://flexzon.vercel.app","https://recordss.vercel.app"],credentials:true,}
      } )
      io.on('connection', (socket) => {
socket.on("join",async data=>{
    ConnectedUsers[socket.id]=data.userId;
    await Member.findByIdAndUpdate(data.userId,{Active:true})
    io.emit("new_user_online","")
    for (const chatId of data?.ChatIds) {
        socket.join(chatId) 
    }
})



socket.on("SendMessage",data=>{
    socket.to(data.chatId).emit("message",data)
})
socket.on("Typing",data=>{
    socket.to(data.chatId).emit("TypingState",{Typing:data.Typing})
})

socket.on("disconnect",async()=>{
    await Member.findByIdAndUpdate(ConnectedUsers[socket.id],{LastLogin:new Date().toISOString(),Active:false})
    delete ConnectedUsers[socket.id]
    io.emit("new_user_online","")

})
    });
};
module.exports = Socket