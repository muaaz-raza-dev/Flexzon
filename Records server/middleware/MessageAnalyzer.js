const MessageAnalyzer =  (chats,AdminId,Invite,InviteduserID)  => {
let AnalyzedChat=  []
chats.reverse().forEach(elm=>{
    const sent = elm._doc.sender._id.toString() === AdminId.toString();
    const read = elm._doc.read.some(id => id.toString() === AdminId.toString());

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
  AnalyzedChat.push({...elm._doc,sent,read})
})
    return AnalyzedChat
}

module.exports= MessageAnalyzer
