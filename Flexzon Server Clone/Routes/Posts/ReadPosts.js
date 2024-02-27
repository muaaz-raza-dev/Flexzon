const app = require("express").Router();
let { StatusCodes } = require("http-status-codes");
const Posts = require("../../models/Posts");
const VerifyMember = require("../../middleware/VerifyMember");
const { ObjectId, LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const Topic = require("../../models/Topic");
const Member = require("../../models/Member");
const PollnQAnalyzer = require("../Member/functions/PollnQAnalyzer");
let limit = parseInt(process.env.DocsPerRequest);

app.get("/topic/:topic", async (req, res) => {
  let count = req.header("count");
  let totalResults = (await Posts.find({ isDeleted:false, topic: req.params.topic })).length
  let payload = await Posts.aggregate([
    {
      $match: {
        topic:new ObjectId(req.params.topic),
        isDeleted:false
      },
    },
      {
        $addFields: {
          author: {
            $cond: {
              if: { $eq: ["$anonymous", true] },
              then: [], // Exclude sensitiveField if isAnonymous is true
              else: "$author", // Include sensitiveField if isAnonymous is false
            },
          },
        },
      },
      {
        $project: { isDeleted: 0,  }
      },
  
    
    {
      
      $lookup: {
        from: "members",
        localField: "author",
        foreignField: "_id",
        as: "author"
    }
    },
    {$unwind: {
      path: "$author",
      // includeArrayIndex: 'author',
      preserveNullAndEmptyArrays: true
    }}
    ,
  
    
    {
      
      $lookup: {
        from: "topics",
        localField: "topic",
        foreignField: "_id",
        as: "topic"
    }
    },
    {$unwind: {
      path: "$topic",
      // includeArrayIndex: 'author',
    }}
   
  
  ]).sort({publishDate:-1,likes:-1})
  let TopicInfo =await Topic.findById(req.params.topic)
  let Followers =(await Member.find({interests:req.params.topic})).length;
  res.json({ success: true, payload ,totalResults ,Topic:{_id:TopicInfo?._id,title:TopicInfo?.title,totalPosts:totalResults,Followers} });
});
app.get("/search", async (req, res) => {
  let count = req.header("count");
  let q = req.header("q");
  let payload = await Posts.aggregate([
    {
      $match: {
        isDeleted:false,
        $text:{$search:q}
      },
    },
      {
        $addFields: {
          author: {
            $cond: {
              if: { $eq: ["$anonymous", true] },
              then: [], // Exclude sensitiveField if isAnonymous is true
              else: "$author", // Include sensitiveField if isAnonymous is false
            },
          },
        },
      },
      {
        $project: { isDeleted: 0,  }
      },
  
    
    {
      
      $lookup: {
        from: "members",
        localField: "author",
        foreignField: "_id",
        as: "author"
    }
    },
    {$unwind: {
      path: "$author",
      // includeArrayIndex: 'author',
      preserveNullAndEmptyArrays: true
    }}
    ,
  
    
    {
      
      $lookup: {
        from: "topics",
        localField: "topic",
        foreignField: "_id",
        as: "topic"
    }
    },
    {$unwind: {
      path: "$topic",
      // includeArrayIndex: 'author',
    }}
   
  
  ]).sort({publishDate:-1,likes:-1}).limit(20)
  // let payload = await Posts.find({ isDeleted:false,anonymous:false,$text:{$search:q}}).populate(["topic","author"]).limit(limit)
  // .skip(parseInt(count) * limit);
  res.json({ success: true, payload ,totalResults:payload.length, count :payload.length>limit*(count==0?count+1:count)?count+1:count  });
});
app.get("/trending", async (req, res) => {
  let payload = await Posts.find({ isDeleted:false,}).sort({ likes: -1, views: -1 }).limit(6);
  res.json({ success: true, payload });
});

app.post("/", async (req, res) => {
  let {  count } = req.body;
  let payload;
  let TotalResults;
  if (req.body.topic!==""){
TotalResults   = (await Posts.aggregate([
  {
    $match:{
      isDeleted:false
    }
  },
  {
    $lookup: {
      from: "topics",
      localField: "topic",
      foreignField: "_id",
      as: "topiced",
    },
  },
  {
    $match: {
      "topiced.title": req.body.topic,
    },
  },

 
])).length

 payload=await Posts.aggregate([
  {
    $lookup: {
      from: "topics",
      localField: "topic",
      foreignField: "_id",
      as: "topic",
    },
  },
  {
    $unwind: {
      path: "$topic",
    },
  },
  {
    $match: {
      "topic.title": req.body.topic,
      isDeleted:false
    },
  },
  {
    $lookup: {
      from: "members",
      localField: "author",
      foreignField: "_id",
      as: "author",
    },
  },
  {
    $unwind: {
      path: "$author",
    },
  },
  {
    $addFields: 
 {
      author: {
        $cond:{
          if: { $eq: ["anonymous", true] },
          then: "$anonymous", // Exclude sensitiveField if isAnonymous is true
          else: "$author", // Include sensitiveField if isAnonymous is false
        },
      },
    },
  },

]).skip(count*limit).limit(limit)


  }
  else{
TotalResults   = await Posts.find({ isDeleted:false,}).count()

   payload=await Posts.aggregate([ 
    {$match:{isDeleted:false}},
    {
      $lookup: {
        from: "topics",
        localField: "topic",
        foreignField: "_id",
        as: "topiced"
      }
    }
  ,
  {
      $addFields: {
        "topiced": {
          $map: {
            input: "$topiced",
            as: "topiced",
            in: "$$topiced.title"
          }
        }
      }
  }
  , 
    {
      $unwind: "$topiced"
    },
    {$sort: {
      publishDate: -1,
      likes:-1
    }},
    {
      $facet: {
        matchingDocs: [
          { $match: { topiced: { $in: req.body.interests?req.body.interests:[] } } },
        ],
        unrelatedDocs: [
          { $match: { topiced: { $nin: req.body.interests?req.body.interests:[] } } },
        ],
      },
    },
    {
      $project: {
        sortedDocs: {
          $concatArrays: ['$matchingDocs', '$unrelatedDocs'],
        },
      },
    },
    {
      $unwind: '$sortedDocs',
    },
    {
      $replaceRoot: { newRoot: '$sortedDocs' },
    },
    {
      $lookup: {
        from: "members",
        localField: "author",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $unwind: "$author"
    },
    {
      $lookup: {
        from: "topics",
        localField: "topic",
        foreignField: "_id",
        as: "topic"
      }
    },
    {
      $unwind: "$topic"
    },
    {
      $addFields: 
   {
        author: {
          $cond:{
            if: { $eq: ["$anonymous", true] },
            then: "$anonymous", // Exclude sensitiveField if isAnonymous is true
            else: "$author", // Include sensitiveField if isAnonymous is false
          },
        },
      },
    },
  ]).skip(count*limit).limit(limit)
  }
    res.json({ success: true,payload,TotalResults });
});




app.post("/topics",async(req,res)=>{
  let payload  = await Posts.aggregate([
    {$group: {
      _id: "$topic",
      }}
  
  ])
  res.json({success:true,payload})
})


app.post("/starter", async (req, res) => {
  await Posts.updateMany({commenting:{$exists:false},likesCount:{$exists:false}} , {
    $set:{commenting:true,likesCount:true}
})
  try {
    await Posts.updateMany({FollowerOnly:{$exists:false}},{$set:{FollowerOnly:false}})
    let TopCreators= await Posts.aggregate([
      {
        $match:{
          publishDate: { $gte: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
          anonymous:false
        }
      },
      {
        $group: {
          _id: "$author",
          posts: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $sort: {
          posts: -1,
          views:-1
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          "author.Name": 1,
          "author.followers": 1,
          "author.avatar": 1,
          "posts":1
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$author", "$$ROOT"],
          },
          
        },
      },
        {
        $project: {
          "author": 0,
        }}
    ]).sort({followers:-1}).limit(20)
    let Topics = await Posts.aggregate([
      {$match: {
        isDeleted:false
      }},
          {$lookup: {
            from: "topics",
            localField: "topic",
            foreignField: "_id",
            as: "topic"
          }},
          {$unwind: {
            path:"$topic",
            preserveNullAndEmptyArrays: false
          }},
          {$group: {
            _id: "$topic.title",
            results: {
              $sum: 1
            },
          }},
          {$sort: {
            "results": -1
          }}
        ,
      {$lookup: {
            from: "topics",
            localField: "_id",
            foreignField: "title",
            as: "topic"
          }},
          {$unwind: {
            path:"$topic",
            preserveNullAndEmptyArrays: false
          }},
        
        ]).limit(20)
    let Trendings = await Posts.find({ isDeleted:false,anonymous:false}).sort({likes:-1,publishDate:-1}).populate(["author","topic"]).sort({likes:-1,publishDate:-1}).limit(6)
    let  Post=await Posts.aggregate([ 
        {$match:{isDeleted:false}},
        {
          $lookup: {
            from: "topics",
            localField: "topic",
            foreignField: "_id",
            as: "topiced"
          }
        }
      ,
      {
          $addFields: {
            "topiced": {
              $map: {
                input: "$topiced",
                as: "topiced",
                in: "$$topiced.title"
              }
            }
          }
      }
      , 
        {
          $unwind: "$topiced"
        },
        {$sort: {
          publishDate: -1,
          likes:-1
        }},
        {
          $facet: {
            matchingDocs: [
              { $match: { topiced: { $in: req.body.interests?req.body.interests:[] } } },
            ],
            unrelatedDocs: [
              { $match: { topiced: { $nin: req.body.interests?req.body.interests:[] } } },
            ],
          },
        },
        {
          $project: {
            sortedDocs: {
              $concatArrays: ['$matchingDocs', '$unrelatedDocs'],
            },
          },
        },
        {
          $unwind: '$sortedDocs',
        },
        {
          $replaceRoot: { newRoot: '$sortedDocs' },
        },
        {
          $lookup: {
            from: "members",
            localField: "author",
            foreignField: "_id",
            as: "author"
          }
        },
        {
          $unwind: "$author"
        },
        {
          $lookup: {
            from: "topics",
            localField: "topic",
            foreignField: "_id",
            as: "topic"
          }
        },
        {
          $unwind: "$topic"
        },
        {
          $addFields: 
       {
            author: {
              $cond:{
                if: { $eq: ["$anonymous", true] },
                then: "$anonymous", // Exclude sensitiveField if isAnonymous is true
                else: "$author", // Include sensitiveField if isAnonymous is false
              },
            },
          },
        },
      ]).limit(limit)
   
    res.json({success: true, payload: {Topics, Trendings, Blogs:Post,TopCreators}})
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Internal server error' });
  }

})

app.get("/post/:id",async(req,res)=>{
  try {
    if (req.params.id.split("").length<20) {
      res.status(400).json({success: false, message: 'Invalid input detected'})
      
    }
    else{
      let Post = await Posts.findById(req.params.id)
    await Posts.aggregate([
    {
      $match: {
        _id : Post._id,
        isDeleted:false,
            },
    },
      {
        $addFields: {
          author: {
            $cond: {
              if: { $eq: ["$anonymous", true] },
              then: [], // Exclude sensitiveField if isAnonymous is true
              else: "$author", // Include sensitiveField if isAnonymous is false
            },
          },
        },
      },
      {
        $project: { isDeleted: 0,  }
      },
  
    
    {
      
      $lookup: {
        from: "members",
        localField: "author",
        foreignField: "_id",
        as: "author"
    }
    },
    {$unwind: {
      path: "$author",
      preserveNullAndEmptyArrays: true
    }},
    {
      $lookup: {
        from: "polls",
        localField: "Poll",
        foreignField: "_id",
        as: "Poll"
    }
    },
    {$unwind: {
      path: "$Poll",
      preserveNullAndEmptyArrays: true
  
    }},
    {
      $lookup: {
        from: "questions",
        localField: "Question",
        foreignField: "_id",
        as: "Question"
    }
    },
    {$unwind: {
      path: "$Question",
      preserveNullAndEmptyArrays: true
  
    }},
   
  ]).then(async post=>{
    let PollnQOutput=PollnQAnalyzer(post[0],req.header("AdminId")||"")
    let likedDetails=[]
    if (post[0].likedDetails[0]) {
      likedDetails = await Member.findById(post[0].likedDetails[0].toString()).select("avatar username")
    }
    if (post[0].author) {
      let Recommendations = await Posts.find({_id:{$ne:post[0]._id}, isDeleted:false,anonymous:false,author:post[0].author._id}).populate("topic").sort({publishDate:-1}).limit(4)
      res.json({success:true,payload:{Post:{...post[0],...PollnQOutput,likedDetails:[likedDetails]},Recommendations}})
    }
    else{
      res.json({success:true,payload:{Post:{...post[0],...PollnQOutput,likedDetails:[likedDetails]},Recommendations:[]}})
  
    }
  })

}
  }
 catch (error) {
  if (error.name === 'BSONError' && error.message === 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer') {
    console.log('Invalid input detected');
    res.status(400).json({success: false, message: 'Invalid input detected'})
  } else {
    console.log(error);
    res.status(500).json({success: false, message: 'Internal server error'})
  }
}}

  )




module.exports = app;
