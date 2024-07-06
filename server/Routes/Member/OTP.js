const app = require("express").Router();
var bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let { StatusCodes } = require("http-status-codes");
const Member = require("../../models/Member");
const Posts = require("../../models/Posts");
const VerifyMember = require("../../middleware/VerifyMember");
const SendOTP = require("./mailer/NodemailerConfig");
let JWT_SECRET = process.env.jwt_Secret;

app.post("/", async (req, res) => {
  let memberEmail = req.body.email;
  let verifyEmail = await Member.findOne({email:memberEmail})
  if (verifyEmail) {
    
      SendOTP(memberEmail)
      .then(async ({info, number}) => {
        console.log(number);
      let User = await Member.findOneAndUpdate(
          { email: memberEmail },
          { OTP: number }
          );
      let TemporaryToken = await jwt.sign({ id: User._id }, JWT_SECRET);
      res.json({
          success: true,
        msg: "OTP sended . check your inbox!",
        TemporaryToken,
      });
    })
    .catch((err) => {
      res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "Error while sending OTP" });
    });
}
else{
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: "Email not exist" });
}
});

app.post("/verify", async (req, res) => {
    let {otp,password}=req.body
    let TemporaryToken = req.header("Temp_token");
    let Token = await jwt.verify(TemporaryToken,JWT_SECRET)
    console.log(Token);
    if (Token) {
        let user =await Member.findOne({_id:Token.id,OTP:otp})
       if (user) {
            bcrypt.hash(password, 8, function (err, hash) {
                if (!err) {
                     Member.findByIdAndUpdate(Token.id,{password:hash}).then(()=>{
                    res.json({ success: true, msg: "Password updated successfully" });
                    }).catch(err=>{
                        console.log(err);
    res.statusCode(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: "Invalid OTP" });
                        
                    })
                }
            });
        }
        else{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: "Invalid OTP" });
        }
    }
    else{
        res.statusCode(StatusCodes.NOT_IMPLEMENTED).json({ success: false, msg: "Enter your email again" });
    }
  });

module.exports = app;
