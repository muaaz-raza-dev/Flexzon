const Member = require('../../models/Member');
const Invites = require('../../models/Invites');
const Chats = require('../../models/Chats');
const Message = require('../../models/Message');
const MessageAnalyzer = require('../../middleware/MessageAnalyzer');
const ChatRead = async(req,res) => {
    let {chatId,count}=req.body
    let limit = 100
    try {
        let Totalchats = await Message.countDocuments({chatId})
        let chats = await Message.find({chatId}).populate({path:"Comments",populate:{path:"UserId",select:"username avatar LastLogin Active"}}).sort({delivered:-1}).limit(limit).skip(count*limit)
        let chatResult = MessageAnalyzer(chats,req.AdminId,false)
        let user =await Chats.findById(chatId)
        let userId= user.Chatters.find(Id=>{
     return Id.toString()!=req.AdminId.toString()
    })
          await Message.updateMany({chatId,}, {$addToSet: {read: req.AdminId.toString()}});
        user =await Member.findById(userId).select("username avatar LastLogin Active")
        const Invited = await Invites.find({ChatId:chatId,Status:"Active"}).populate("InvitedMember")
        res.json({success:true,payload:chatResult,user, count:Totalchats>(count*limit)?count+1:count,Invited, total:Totalchats, })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to retrieve chats", error: error.message });
    }
    }


module.exports=ChatRead
