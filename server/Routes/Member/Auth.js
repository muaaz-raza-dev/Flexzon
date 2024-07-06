const app = require("express").Router();
var bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let { StatusCodes } = require("http-status-codes");
const Member = require("../../models/Member");
const Posts = require("../../models/Posts");
const VerifyMember = require("../../middleware/VerifyMember");
const Comments = require("../../models/Comments");
let JWT_SECRET = process.env.jwt_Secret;
//! Create
app.post("/register", async (req, res) => {
  let { Name, username, email, password,  Topics } = req.body;
  let verification = await Member.find({ username, isDeleted:false }).count();
  let emailExist = await Member.find({ email ,isDeleted:false }).count();
  if (verification != 0||emailExist!=0) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ success: false, msg: "username or email already exists" });

  } else {
    try {
      bcrypt.hash(password, 8, function (err, hash) {
        if (!err) {
          Member.create({
            Name,
            username,
            email,
            password: hash,
            avatar:req.body?.avatar||"https://res.cloudinary.com/dz8a9sztc/image/upload/v1709049135/anonymous_dxx1ih.png",
            bio:`Hello I am new  member ${Name} at Flexzon , I will share fruitfuil and interesting contents about many topics here , Follow me 🙂`,
            interests: Topics,
          })
            .then(async (user) => {
              let userInfo = await Member.findById(user._id).populate([
                "followers",
                "following",
                "Posts",
                "saved",
                "interests",
                "liked",
              ]);
              let AuthToken = jwt.sign({ id: user._id }, JWT_SECRET);
              res.status(StatusCodes.ACCEPTED).json({
                success: true,
                token: AuthToken,
                msg: "logined successfully",
                payload: userInfo,
              });
            })
            .catch((err) => {
              console.log(err);
              res
                .status(StatusCodes.BAD_GATEWAY)
                .json({ success: false, msg: "try again later!" });
            });
        } else {
          console.log(err);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, msg: "Internal server error" });
        }
      });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Internal server error" });
    }
  }
});
//! Read / Verify
app.post("/verify", async (req, res) => {
  let { token } = req.body;
  try {
    let decodedToken = await jwt.verify(token, JWT_SECRET);

    if (decodedToken) {
      await Member.findOneAndUpdate(
        { _id: decodedToken.id, notificationSettings: { $exists: false } },
        {  notificationSettings:{all:true,follows:true,comments:true,posts:true,likes:true} }
      );
      Member.findById(decodedToken.id)
        .select("-password")
        .populate(["followers", "following", "Posts", "interests", ,])
        .populate({ path: "saved", populate: { path: "topic" } })
        .select("title -notifications")
        .then(async (user) => {
          let AnonymousPost = await Posts.find({
            anonymous: true,
            isDeleted: false,
            author: user._id,
          }).populate(["author", "topic"])
          res.status(StatusCodes.OK).json({
            success: true,
            msg: "verification completed",
            payload: { ...user._doc, anonymous: AnonymousPost },
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .json({ success: false, msg: "Invalid credentials" });
        });
    } else {
      res
        .json({ success: false, msg: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    res
      .json({ success: false, msg: "Invalid credentials" });
  }
});

app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  await Member.updateMany(
    { isDeleted: { $exists: false } },
    { isDeleted: false }
  );
  try {
    let result = await Member.findOne({ username, isDeleted: false }).populate([
      "followers",
      "following",
      "Posts",
      "saved",
      "interests",
      "liked",
    ]);
    console.log(result);
    if (!result) {
      result = await Member.findOne({
        email: username,
        isDeleted: false,
      }).populate([
        "followers",
        "following",
        "Posts",
        "saved",
        "interests",
        "liked",
      ]);
      if (!result) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ success: false, msg: "Invalid username or email" });
      } else {
        let verification = await bcrypt.compare(password, result.password);
        if (verification) {
          let token = await jwt.sign({ id: result._id }, JWT_SECRET);
          res
            .status(StatusCodes.ACCEPTED)
            .json({
              success: true,
              token,
              msg: "logined successfully",
              payload: result,
            });
        } else {
          res.json({ success: false, msg: "Invalid password" });
        }
      }
    } else {
      let verification = await bcrypt.compare(password, result.password);
      if (verification) {
        let token = await jwt.sign({ id: result._id }, JWT_SECRET);
        res
          .status(StatusCodes.ACCEPTED)
          .json({
            success: true,
            token,
            msg: "logined successfully",
            payload: result,
          });
      } else {
        res.json({ success: false, msg: "Invalid password" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "internal server error" });
  }
});

app.post("/verifyPassword", VerifyMember, async (req, res) => {
  let { password } = req.body;
  try {
    let member = await Member.findById(req.AdminId);
    let verify = bcrypt.compare(password, member.password);
    if (verify === true) {
      res
        .status(StatusCodes.OK)
        .json({ success: true, msg: "verification completed" });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, msg: "Invalid password" });
    }
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Invalid credentials" });
  }
});

app.post("/verifyUsername", async (req, res) => {
  let { username } = req.body;
  let availiblity = await Member.find({ username, isDeleted: false }).count();
  if (availiblity == 0) {
    res.json({ success: true, msg: "Available" });
  } else {
    res.json({ success: false, msg: "Unavailable" });
  }
});
//!Update
app.put("/update", VerifyMember, async (req, res) => {
  let {
    Name,
    username,
    bio,
    email,
    avatar,
    age,
    interests,
    Links,
    website,
    gender,
    contact,
    dob,
  } = req.body;
  try {
    await Member.findByIdAndUpdate(
      { _id: req.AdminId },
      {
        Name,
        username,
        bio,
        email,
        avatar,
        age,
        Links,
        interests: interests.map((elm) => elm._id),
        website,
        gender,
        contact,
        dob,
      }
    );
    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "information updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "internal server error" });
  }
});

app.put("/Delete", VerifyMember, async (req, res) => {
  let { password } = req.body;
  try {
    let member = await Member.findById(req.AdminId);
    let verify = await bcrypt.compare(password, member.password);
    if (verify) {
      await Member.findByIdAndDelete({ _id: req.AdminId }, { isDeleted: true });
      await Comments.deleteMany({ commentor: req.AdminId });
      await Posts.updateMany({ author: req.AdminId }, { isDeleted: true });
      res
        .status(StatusCodes.OK)
        .json({ success: true, msg: "information updated successfully" });
    } else {
      res.json({ success: false, msg: "Invalid password" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "internal server error" });
  }
});

module.exports = app;
