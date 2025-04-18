const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const UserModel = require("./models/User");
const CommentModel = require("./models/Comment");
const VoteModel = require("./models/Vote");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const salt = bcrypt.genSaltSync(10);
const secret = "8339jfksk9slfl09433rjss0";

mongoose.connect(process.env.MONGO_URL);

// app.get("/test", (req, res) => {
//   res.send("test ok");
// });

// TOKEN FUNCTION==========
async function getUserFromToken(adevi) {
  const userInfo = jwt.verify(adevi, secret);
  if (adevi) {
    return await UserModel.findById(userInfo._id);
  } else {
    return res.status(401).json("unauthorized");
  }
}

//PROFILE
app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { adevi } = req.cookies;
  if (adevi) {
    jwt.verify(adevi, secret, {}, (err, userInfo) => {
      if (err) throw err;
      return res.status(200).json(userInfo);
    });

    // getUserFromToken(adevi).then((userInfo) => {
    //   // userInfo.password= undefined;
    //   return res.status(200).json({profileData: userInfo});
    // });
  } else {
    return res.status(401).json("There is no token");
  }
});

// REGISTER
app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  mongoose.connect(process.env.MONGO_URL);
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, salt);
    const userDoc = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const findUser = await UserModel.findOne({ email });
    if (findUser.email) {
      jwt.sign(
        { id: findUser._id, username, email },
        secret,
        {},
        (err, token) => {
          if (err) throw err;

          let farFuture = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
          ); // ~10y

          return res
            .status(201)
            .cookie("adevi", token, { expires: farFuture })
            .json({ id: findUser._id, username, email });
        }
      );
    } else {
      return res.status(200).json({ errorMsg: "Wrong credentials" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  try {
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(200).json({ errorMsg: "Wrong email" });
    }
    const passwordOk = bcrypt.compareSync(password, findUser.password);
    if (passwordOk) {
      jwt.sign(
        { id: findUser._id, username: findUser.username, email },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          let farFuture = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
          ); // ~10y
          return res
            .status(200)
            .cookie("adevi", token, { expires: farFuture })
            .json({ id: findUser._id, username: findUser.username, email });
        }
      );
    } else {
      return res.status(200).json({ errorMsg: "Wrong password" });
    }
  } catch {
    (err) => {
      return res.status(500).json(err);
    };
  }
});

app.post("/api/post", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { adevi } = req.cookies;

  if (!adevi) {
    return res.status(200).json({ errorMsg: "Please sign up" });
  }

  const { author, postedBy, title, body, codeBody, rootId, parentId } = req.body;
  const postDoc = await CommentModel.create({
    author,
    postedBy,
    title,
    body,
    codeBody,
    rootId,
    parentId,
  });
  return res.status(201).json(postDoc);
});

app.get("/api/comments", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const commentsDoc = await CommentModel.find({ rootId: null }).sort({
    createdAt: -1,
  });
  return res.status(200).json(commentsDoc);
});

app.get("/api/comments/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const id = req.params.id;
  const comment = await CommentModel.findById(id);
  res.status(200).json(comment);
});

app.get("/api/comments/root/:commentId", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const rootId = req.params.commentId;
  const allComments = await CommentModel.find({ rootId: rootId }).sort({
    createdAt: -1,
  });
  return res.status(200).json(allComments);
});

app.post("/api/logout", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  res.status(200).cookie("adevi", "").json("token is empty");
});

// VOTING ROUTES========
app.get("/api/vote/:commentId/:direction", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const adevi = req.cookies.adevi;

  const { commentId, direction } = req.params;

  if (adevi) {
    jwt.verify(adevi, secret, {}, async (err, userInfo) => {
      if (err) throw err;
      // res.status(200).json(userInfo);

      // removing my existing vote
      await VoteModel.deleteOne({
        commentId: commentId,
        email: userInfo.email,
      }).then(async () => {
        if (["up", "down"].indexOf(direction) === -1) {
          res.status(200).json(true);
          return;
        }

        // creating my new vote
        const vote = await VoteModel.create({
          author: userInfo.username,
          email: userInfo.email,
          commentId,
          direction: direction === "up" ? 1 : -1,
        }).then(() => {
          return res.status(200).json(true);
        });
      });
    });

    // getUserFromToken(req.cookies?.adevi).then(async (userInfo) => {
    //   // removing my existing vote
    //   await VoteModel.deleteOne({
    //     commentId: commentId,
    //     email: userInfo.email,
    //   }).then(async () => {
    //     if (["up", "down"].indexOf(direction) === -1) {
    //       res.status(200).json(true);
    //       return;
    //     }

    //     // creating my new vote
    //     const vote = await VoteModel.create({
    //       author: userInfo.username,
    //       email: userInfo.email,
    //       commentId,
    //       direction: direction === "up" ? 1 : -1,
    //     }).then(() => {
    //       return res.status(200).json(true);
    //     });
    //   });

    //   // const vote = await VoteModel.create({
    //   //   author: userInfo.username,
    //   //   email: userInfo.email,
    //   //   commentId,
    //   //   direction: direction === "up" ? 1 : -1,
    //   // }).then(async () => {
    //   //   await VoteModel.find({ commentId: commentId }).then((commentVotes) => {
    //   //     let total = 0;
    //   //     commentVotes.forEach((vote) => {
    //   //       total += vote.direction;
    //   //     });
    //   //     return res.status(200).json(total);
    //   //   });
    //   // });

    // });
  } else {
    return res.status(200).json("unauthorized");
  }

  // res.status(200).json({ commentId, direction });
});

app.post("/api/votes", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const { commentsIds } = req.body;

  const adevi = req.cookies.adevi;

  if (adevi) {
    jwt.verify(adevi, secret, {}, async (err, userInfo) => {
      if (err) throw err;
      // res.status(200).json(userInfo);

      await VoteModel.find({ commentId: { $in: commentsIds } }).then(
        (votes) => {
          let commentsTotals = {};
          votes.forEach((vote) => {
            if (typeof commentsTotals[vote.commentId] === "undefined") {
              commentsTotals[vote.commentId] = 0;
            }
            commentsTotals[vote.commentId] += vote.direction;
          });

          // commentsTotals['kpk']= 11;

          let userVotes = {};
          votes.forEach((vote) => {
            if (vote.email === userInfo.email) {
              userVotes[vote.commentId] = vote.direction;
            }
          });
          res.status(200).json({ commentsTotals, userVotes });
        }
      );
    });
  } else {
    return res.status(200).json("unauthorized");
  }

  // getUserFromToken(req.cookies.adevi).then(async (userInfo) => {
  //   await VoteModel.find({ commentId: { $in: commentsIds } }).then((votes) => {
  //     let commentsTotals = {};
  //     votes.forEach((vote) => {
  //       if (typeof commentsTotals[vote.commentId] === "undefined") {
  //         commentsTotals[vote.commentId] = 0;
  //       }
  //       commentsTotals[vote.commentId] += vote.direction;
  //     });

  //     // commentsTotals['kpk']= 11;

  //     let userVotes = {};
  //     votes.forEach((vote) => {
  //       if (vote.email === userInfo.email) {
  //         userVotes[vote.commentId] = vote.direction;
  //       }
  //     });
  //     res.status(200).json({ commentsTotals, userVotes });
  //   });
  // });
});

// DELETE POST
app.delete("/api/comments/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);

  const id = req.params.id;
  await CommentModel.findByIdAndDelete(id);
  return res.status(200).json(true);
});

// UPDATE POST
app.put("/api/comments/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedDoc = await CommentModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return res.status(200).json(updatedDoc);
});

// UPDATE USER
app.put("/api/updateprofile", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // get user
    const dbUser = await UserModel.findOne({ email });

    // password validate:
    if (password && password.length < 6) {
      return res.status(200).json({
        success: false,
        errorMsg: "Password should be 6 char long",
      });
    }

    //hashed password:
    const hashedPassword = bcrypt.hashSync(password, salt);
    const hashingPassword = password ? hashedPassword : undefined;

    // update user
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        username: username || dbUser.username,
        password: hashingPassword || dbUser.password,
      },
      { new: true }
    );

    // const adevi = req.cookies.adevi;
    // if(adevi){
    //   jwt.verify(adevi, secret, {}, (err, userInfo) => {
    //     if (err) throw err;
    //     res.status(200).json(userInfo);
    //   });
    // }

    if (updatedUser.email) {
      jwt.sign(
        { id: dbUser._id, username, email },
        secret,
        {},
        (err, token) => {
          if (err) throw err;

          let farFuture = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
          ); // ~10y

          return res
            .status(201)
            .cookie("adevi", token, { expires: farFuture })
            .json({ id: dbUser._id, username, email });
        }
      );
    }

    // updatedUser.password = undefined;
    // return res.status(200).json({
    //   success: true,
    //   message: "Successfully updated please login",
    //   // user: updatedUser,
    // });
  } catch (err) {
    // console.log("Error in update user==>", err);
    return res.status(500).json({
      success: false,
      message: "Error in update user api",
      error: err,
    });
  }
});

if (process.env.PORT) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server running on ${port}`);
  });
}

module.exports = app;
