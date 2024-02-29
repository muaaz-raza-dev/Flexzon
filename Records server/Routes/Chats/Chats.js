const express = require('express');
const Member = require('../../models/Member');
const VerifyMember = require('../../middleware/VerifyMember');
const Chats = require('../../models/Chats');
const Message = require('../../models/Message');
const MessageAnalyzer = require('../../middleware/MessageAnalyzer');
const {mongoose}=require("../../db");
const Invites = require('../../models/Invites');
const  ChatRead  = require('./ChatRead.controller');
const router = express.Router();
// Define routes here
router.post("/search/:username",VerifyMember,async(req,res)=>{
    try {
        let Members;
        let chat = await Chats.findById(req.body.chatId)
        if (req.body.chatId) {
            Members = await Member.find({$text:{$search:req.params.username},_id:{$nin:chat.Chatters}}).select("username Name avatar")
        } else {
            Members = await Member.find({$text:{$search:req.params.username}}).select(" username Name avatar")
        }
        
        let searchedusers = [];
        await Promise.all(Members.map(async elm => {
            if(req.body.chatId){
                let exist = await Invites.findOne({InvitedMember:elm._id,ChatId:req.body.chatId})
                 if (!exist) {
                    console.log("not exist");
                    searchedusers.push({...elm._doc});
                }
            }
            // else{
                let count = await Chats.countDocuments({Chatters: {$all: [elm._id, req.AdminId]}});
                if (count == 0) {
                    searchedusers.push({...elm._doc});
                }
            // }
        }));
      
        return res.status(200).json({ success: true, payload: searchedusers});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Failed to search users", error: error.message });
    }
})

router.post("/InitializeChat",VerifyMember,async(req,res)=>{
let {member2}= req.body
let chat =await Chats.find({Chatters:[req.AdminId,member2]})
if (chat.length==0){
let newChat = await Chats.create({Chatters:[req.AdminId,member2]})
res.json({ success: true, message: "Chat initialized successfully." ,payload:newChat});
}
else{
res.json({ success: true, message: "already in your chatlist" });
}
})

router.get("/AllChats",VerifyMember,async(req,res)=>{
        try {
            let chats = await Chats.find({Chatters:req.AdminId}).populate({path :"Chatters",select:"username avatar LastLogin Active "}).populate("RecentMessage")
           let Invite = await Invites.find({InvitedMember:req.AdminId}).populate({ path: "ChatId", 
           as: "ChatDetails",populate:{path:"Chatters",select:"username avatar LastLogin Active"},  }).populate({path:"InvitedBy",select:"username avatar LastLogin Active"})
             res.status(200).json({ success: true, 
                payload: await Promise.all(chats.map(async chat=>{
                    let unread = await Message.countDocuments({chatId:chat._doc._id,read:{$nin:[req.AdminId]}})
                    return {...chat._doc,Chatters:chat.Chatters.find(elm=> req.details.username!=elm.username),  unread}
                }))
             ,Invites:Invite});

        } catch (error) {
             res.status(500).json({ success: false, message: "Failed to retrieve chats", error: error.message });
        }
})






router.post("/send",VerifyMember,async(req,res)=>{
    let {content,chatId,receiver} = req.body
    try {
        if(content!==""){

            const message = await Message.create({
                content, chatId,
                sender:req.AdminId,receiver,
                read:[req.AdminId]
            });
            await Chats.findByIdAndUpdate(chatId,{RecentMessage:message._doc._id})
            res.status(200).json({ success: true, message: "Message sent successfully." ,payload:{...message._doc,sent:true}});
    }
    else{
        res.status(500).json({ success: false, message: "Failed to send message", error: error.message });

    }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
    }
})


router.post("/delete",VerifyMember,async(req,res)=>{
    let {chatId} = req.body
    try {
  await    Message.deleteMany({chatId})
    await Chats.findByIdAndUpdate(chatId, {$unset:{RecentMessage:true} });
    res.status(200).json({ success: true, message: "Chat deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
    }
})


router.post("/deleteConversations",VerifyMember,async(req,res)=>{
    let {chatId} = req.body
    let session = await mongoose.startSession()
    try {
    session.startTransaction()
  await    Message.deleteMany({chatId},{session:session})
    await Chats.findByIdAndDelete(chatId,{session:session});
    await session.commitTransaction()
    res.status(200).json({ success: true, message: "Chat deleted successfully."});
    } catch (error) {
    await session.abortTransaction()
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
    }
})
module.exports = router;

router.post("/chat",VerifyMember,ChatRead)