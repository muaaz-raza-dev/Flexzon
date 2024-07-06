const app = require("express").Router();
let { StatusCodes } = require("http-status-codes");
const Posts = require("../../models/Posts");
const VerifyMember = require("../../middleware/VerifyMember");
const Member = require("../../models/Member");
const Notifications = require("../../models/Notifications");

app.post("/get", VerifyMember, async (req, res) => {
  let allnotifications = await Notifications.find({Reciever:req.AdminId,}).populate("NotificationIncludedUser").sort({notifiedTime:-1}).limit(50) ;
  console.log(allnotifications , );
  res.status(StatusCodes.OK).json({
      success: true,
      msg: "Notifications retrieved successfully",
      payload: allnotifications
    });
});

app.post("/read", VerifyMember, async (req, res) => {
  let { id } = req.body;
  let allnotifications = await Notifications.findByIdAndUpdate(id,{read:true}) ;
  res.status(StatusCodes.OK).json({
      success: true,
      msg: "Notifications retrieved successfully",
    });
});

app.post("/change", VerifyMember, async (req, res) => {
  let {notificationSettings}=req.body
   await Member.findByIdAndUpdate(req.AdminId,{notificationSettings})
  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Notification settings updated successfully",
  });
});

module.exports = app;
