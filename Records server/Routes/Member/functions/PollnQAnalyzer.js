function PollnQAnalyzer(post,id) {
    let PollnQ={}
    let type=post.AdditonalAssetsType
    if (post.AdditonalAssetsType) {
        if (post.AdditonalAssetsType=="Poll") {
          PollnQ.Poll = {...post.Poll}
        }
         else  {
          PollnQ.Question = {...post.Question}
        }
        if (post[type].options.some(elm=>elm.votes.some(voter=>voter.toString()==id) ==true)) {
            PollnQ[type].Polled=true
            if (type=="Question") {
                PollnQ[type].voted=post.Question.options.find(elm=>elm.votes.some(voter=>voter.toString()==id)).title
            }
        }
        
        
        let totalVotes = 0
        if (type == "Poll") {
        post?.Poll?.options?.forEach(elm=>{
            totalVotes+=elm.votes.length            
        })
    }
    else if(type=="Question"){
        post?.Question.options?.forEach(elm=>{
            totalVotes+=elm.votes.length            
        }) 
        post.Question.correct = post.Question.correct
        }
        
        PollnQ[type].options=PollnQ[type]?.options.map(elm=>{
            return {...elm,votes:Math.round((elm.votes.length/totalVotes)*100)||0}
        }) ; 
        
        PollnQ[type].total = totalVotes
    }
return PollnQ
}

module.exports=PollnQAnalyzer