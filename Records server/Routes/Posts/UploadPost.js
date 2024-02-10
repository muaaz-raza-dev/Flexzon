const app = require("express").Router();
let { StatusCodes } = require("http-status-codes");
const Posts = require("../../models/Posts");
const VerifyMember = require("../../middleware/VerifyMember");
const Topic = require("../../models/Topic");
const Member = require("../../models/Member");
const Polls = require("../../models/Polls");
const Question = require("../../models/Question");

app.post("/", VerifyMember,async (req, res) => {
    //AditionalAssets = Polls and Questions
  
  let {author,title,subTitle,banner,content,timeToRead,topic,tags,anonymous,FollowerOnly,AdditonalAssets,AdditonalAssetsType,commenting,nodmeno
} = req.body;
  let  PayloadAssest = {}
  if(AdditonalAssetsType == "Poll"){
    let Polled =await Polls.create({author:req.AdminId,...AdditonalAssets})
    PayloadAssest.Poll=Polled._id
  }
  else{
    let Questioned =await Question.create({author:req.AdminId,...AdditonalAssets})
    PayloadAssest.Question=Questioned._id
  }
  let TopicInDb=await Topic.findOne({$text:{$search:topic}})
  if (TopicInDb) {
    Posts.create({
        author,title,commenting,likesCount,subTitle,banner,content,timeToRead,topic:TopicInDb._id,tags,anonymous,FollowerOnly,AdditonalAssetsType,...PayloadAssest
    })
    .then(async post=>{
         await Member.findByIdAndUpdate(author,{$push:{Posts:post._id}})
         let UpdatedPost = await Posts.findById(post._id).populate(["topic","author"])
         res.json({success:true,msg:"Post created successfully",payload:UpdatedPost})
        }).catch(err=>{
            console.log(err);
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, msg: "Internal server error" });
        })
  }
  else{
      Topic.create({title:topic}).then((topic)=>{
          Posts.create({
        author:req.AdminId ,commenting,likesCount,title,subTitle,banner,content,timeToRead,topic,tags,anonymous,
        AdditonalAssetsType,...PayloadAssest
    })
    .then(async post=>{
         await Member.findByIdAndUpdate(author,{$push:{Posts:post._id}})
         let UpdatedPost = await Posts.findById(post._id).populate(["topic","author"])
         res.json({success:true,msg:"Post created successfully",payload:UpdatedPost})
        }).catch(err=>{
            console.log(err);
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, msg: "Internal server error" });
        })
    })
}
});

app.put("edit/:id",VerifyMember,async(req,res)=>{
    let {author,title,subTitle,banner,publishDate,content,views,timeToRead,topic,tags}=req.body
    let updatedPost = await Posts.findOneAndUpdate({_id:req.params.id,author:req.AdminId},{
        author,title,subTitle,banner,publishDate,content,views,timeToRead,topic,tags
    })
    if (!updatedPost) {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Internal server error" });
       }   
    else{
        res.json({success:true,msg:"Updated successfully",payload:await Posts.findById(req.params.id)})
    }
})

app.delete("/delete/:id",VerifyMember,async(req,res)=>{
  let deletedPost =await Posts.findByIdAndUpdate(req.params.id,{isDeleted:true})
  console.log(deletedPost);
  let allPosts =await Posts.find({author:req.AdminId,isDeleted:false}).populate(["author","topic"])
  res.json({success:true,msg:"Post deleted successfuly!",payload:allPosts})
})
module.exports = app;
