const app = require("express").Router();
const { ObjectId } = require("mongodb");
const VerifyMember = require("../../middleware/VerifyMember");
const Polls =require("../../models/Polls")
const Questions =require("../../models/Question")
let limit = parseInt(process.env.DocsPerRequest);

app.post("/poll",VerifyMember,async(req,res)=>{
let Poll= req.body.Poll 
let OptionsTitle=req.body.title
let ToPoll = await Polls.findById(Poll._id)
let Options = ToPoll.options.map(elm=>{
    if (elm._doc.title == OptionsTitle) {
        return {...elm._doc,votes:[...elm.votes,req.AdminId]}
    }
    else{
        return elm._doc
    }
})

await Polls.findByIdAndUpdate(Poll._id,{options:Options})
res.json({success: true, message: 'Poll vote has been successfully recorded',title:OptionsTitle});


})




app.post("/question",VerifyMember,async(req,res)=>{
    let Question= req.body.Question
    let OptionsTitle=req.body.title
    let ToPoll = await Questions.findById(Question._id)
    let Options = ToPoll?.options?.map(elm=>{
        if (elm._doc.title == OptionsTitle) {
            return {...elm._doc,votes:[...elm.votes,req.AdminId]}
        }
        else{
            return elm._doc
        }
    })
    
    await Questions.findByIdAndUpdate(Question._id,{options:Options})
    res.json({success: true, message: 'Poll vote has been successfully recorded',title:OptionsTitle});
    
})

module.exports = app;
