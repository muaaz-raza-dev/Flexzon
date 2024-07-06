const moment = require("moment");

const MessageAnalyzer =  (chats,AdminId,Invite,InviteduserID)  => {
let AnalyzedChat=  []
let FormattedChat = {}
chats.reverse().forEach(elm=>{
  let DeliveredTime = moment(elm._doc.delivered).calendar(null,{
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'L'
})
    const sent = elm._doc.sender._id.toString() === AdminId.toString();
    const read = elm._doc.read.some(id => id.toString() === AdminId.toString());
      if (!FormattedChat[DeliveredTime]) {
        FormattedChat[DeliveredTime]=[]
      }
    if (Invite&&InviteduserID) {

 if (elm._doc.Comments.length==0) {
  elm._doc.Comments = {}
  elm._doc.Commented=false 
 }
 else{
   const Comment = elm._doc.Comments.find(elm=>elm.UserId._id.toString()==InviteduserID.toString())
   if (Comment&&Object.keys(Comment).length!=0) {
  elm._doc.Commented=true
  }
  else{
    elm._doc.Commented=false 
    
  }
  elm._doc.Comments = Comment
  }
    }else{
      elm._doc.Commented= elm._doc.Comments.length > 0
    }
    FormattedChat[DeliveredTime].push({...elm._doc,sent,read})

  AnalyzedChat.push({...elm._doc,sent,read})
})
    return FormattedChat
}

module.exports= MessageAnalyzer
