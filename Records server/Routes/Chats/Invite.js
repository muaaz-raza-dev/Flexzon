const express = require('express');
const VerifyMember = require('../../middleware/VerifyMember');
const router = express.Router();
const Invites = require('../../models/Invites');
const Message = require('../../models/Message');
const MessageAnalyzer = require('../../middleware/MessageAnalyzer');
const ChatComment = require('../../models/ChatComment');
const Member = require('../../models/Member');
const Chats = require('../../models/Chats');
router.post("/",VerifyMember,async(req,res)=>{
    let {chatId,InvitedMember} =req.body
    try {
let invitation=await Invites.create({ChatId:chatId,InvitedMember,InvitedBy:req.AdminId})
res.status(200).json({ success: true, message: "Invitation sent successfully.", payload:invitation });
} catch (error) {
    res.status(500).json({ success: false, message: "Failed to send invitation", error: error.message });
}
})

router.post("/readMessages",VerifyMember,async(req,res)=>{
    let {InvitationId,count} =req.body
    let limit=100
    try {
        let Invitation = await Invites.findOne({_id:InvitationId,InvitedMember:req.AdminId})
        if(!Invitation){
            res.json({ success: false, message: "Not Invited." });
        }
        else{
            let Totalchats = await Message.countDocuments({chatId:Invitation.ChatId.toString()})
            let chats = await Message.find({chatId:Invitation.ChatId.toString()}).populate({path:"Comments",populate:{path:"UserId",select:"username avatar"}}).populate({path:"sender",select:"username avatar"}).sort({delivered:-1}).limit(limit).skip(count*limit)
        let chatResult = MessageAnalyzer(chats,Invitation.InvitedBy,true,req.AdminId)
        let Invite = await Invites.findOne({InvitedMember:req.AdminId,_id:InvitationId}).populate({ path: "ChatId", 
        as: "ChatDetails",populate:{path:"Chatters",select:"username avatar"},  }).populate({path:"InvitedBy",select:"username avatar"})
        res.json({success:true,payload:chatResult,chatId:Invitation.ChatId, count:Totalchats>((count||1)*limit)?count+1:count, total:Totalchats,Invitation:Invite})
    }
} catch (error) {
    console.log("Error in getting chats : ",error);
    res.status(500).json({ success: false, message: "Failed to fetch messages", error: error.message });
}
})


router.post("/AddComment",VerifyMember,async(req,res)=>{
    let {ChatId,MessageId,Comment}=req.body;
    try {
        if (!req.body.CommentId) {
            
            ChatComment.create({ChatId,MessageId,Comment,UserId:req.AdminId}).then(async comment=>{
                await Message.findByIdAndUpdate(MessageId,{$push:{Comments:comment._id}})
                res.status(200).json({ success: true, message: "Comment added successfully.", payload:comment });
            })
        }
        else{
          await  ChatComment.findByIdAndUpdate(req.body.CommentId,{Comment})
        res.status(200).json({ success: true, message: "Comment added successfully.", payload:await ChatComment.findById(req.body.CommentId) });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add comment", error: error.message });
    }


})

router.post("/EndInviteByUser",VerifyMember,async(req,res)=>{
try {
    let {InvitationId}=req.body
    let InvitationDetails = await  Invites.findOneAndDelete({_id:InvitationId,InvitedMember:req.AdminId});
    res.json({ success: true, message: "Invited Deleted Successfully" });
} catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete invitation", error: error.message });
}
})
router.post("/EndInviteByAdmin",VerifyMember,async(req,res)=>{
    try {
        let {InvitationId}=req.body
        let VerifyAdmins = await Chats.findOne({Chatters:req.AdminId})
        if (VerifyAdmins) {
            let InvitationDetails = await  Invites.findOneAndDelete({_id:InvitationId});
            res.json({ success: true, message: "Invited Deleted Successfully" ,payload:InvitationId});
        }
        else{
            res.status(403).json({ success: false, message: "You are not authorized to end this invitation." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete invitation", error: error.message });
    }
    
    })


module.exports=router

