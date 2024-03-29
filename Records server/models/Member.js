const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const Orderschema = new mongoose.Schema({
    username:{type:String,required:true,unique:true,text:true},
    avatar:{type:String,default:"https://res.cloudinary.com/dz8a9sztc/image/upload/v1709049135/anonymous_dxx1ih.png"},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    Name:{type:String,required:true},
    bio:{type:"string"},
    followers:{type:[ObjectId],ref:"Member"},
    following:{type:[ObjectId],ref:"Member"},
    Posts:{type:[ObjectId],ref:"Posts"},
    saved:{type:[ObjectId],ref:"Posts"},
    interests:{type:[ObjectId],ref:"Topic"},
    liked:{type:[ObjectId],ref:"Posts"},
    isDeleted:{type:Boolean,default:false},
    registeredDate:{type:Date,default:Date.now},
    dob:{value:String,display:{type:Boolean,default:false}}, 
    website:{url:String,altText:String},
    contact:{value:String,display:{type:Boolean,default:false}},
    Links:{fb:String,insta:String,linkedIn:String} ,
    gender:{value:String,display:{type:Boolean,default:false}},
    OTP:Number,
    profileViews: [{viewer: {type: ObjectId, ref: "Member"}, date: {type: Date, default: Date.now}}],
    notificationSettings:{all:Boolean,follows:Boolean,comments:Boolean,posts:Boolean,likes:Boolean},
    LastLogin:{type:String} ,// or 20mins ago ,etc
    Active:{type:Boolean,default:false}
    });
module.exports = mongoose.model("Member", Orderschema);