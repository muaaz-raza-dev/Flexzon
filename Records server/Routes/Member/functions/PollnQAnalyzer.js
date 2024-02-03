function PollnQAnalyzer(post,id) {
    let PollnQ={}
    let type=null
    if (post.AdditonalAssetsType) {
        if (post
            .Poll) {
          PollnQ.Poll = {...post.Poll}
          type="Poll"
        }
        else{
          PollnQ.Question = {...post.Question}
          type="Question"
        }
        if (post[type].options.some(elm=>elm.votes.some(voter=>voter.toString()==id) ==true)) {
            PollnQ[type].Polled=true
        }
        
        
        let totalVotes = 0
        if (type = "Poll") {
        post?.Poll?.options?.forEach(elm=>{
            totalVotes+=elm.votes.length            
        })
    }
    else if(type=="Question"){
        post?.Question.options?.forEach(elm=>{
            totalVotes+=elm.votes.length            
        }) 
        }
        
        PollnQ[type].options=PollnQ[type].options.map(elm=>{
            return {...elm,votes:Math.round((elm.votes.length/totalVotes)*100)||0}
        }) ; 
        
        PollnQ[type].total = totalVotes
    }
return PollnQ
}

module.exports=PollnQAnalyzer