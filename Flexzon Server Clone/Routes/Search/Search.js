const app = require("express").Router();
const Member = require("../../models/Member");
const Topic = require("../../models/Topic");
app.post("/",async(req,res)=>{
    let {q}=req.body
    let UsersResult = await Member.find({$text:{$search:q}}).limit(5)
    let TopicResult = await Topic.find({ $text:{$search:q}}).limit(5)
    res.json({success:true,payload:{topics:TopicResult,users:UsersResult}})
})

module.exports = app