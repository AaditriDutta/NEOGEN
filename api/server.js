const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const cors = require("cors"); // import cors
const cookieParser = require("cookie-parser"); // import cookie-parser
const bodyParser = require("body-parser"); // import body-parser
const bcrypt = require("bcrypt"); // import bcrypt
const jwt = require("jsonwebtoken"); // import jwt
const dotenv = require("dotenv"); // import dotenv
dotenv.config(); // load .env config

const UserModel = require("./models/User"); // import User model
const CommentModel = require("./models/Comment"); // import Comment model
const VoteModel = require("./models/Vote"); // import Vote model

const app = express(); // create express app

app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend origin
    credentials: true, // allow cookies
  })
);
app.use(cookieParser()); // parse cookies
app.use(bodyParser.urlencoded({ extended: true })); // parse URL form data
app.use(express.json()); // parse JSON body

const salt = bcrypt.genSaltSync(10); // generate bcrypt salt
const secret = "8339jfksk9slfl09433rjss0"; // JWT secret

mongoose.connect(process.env.MONGO_URL); // connect MongoDB

// ====== Auth Helper ======
async function getUserFromToken(adevi) {
  const userInfo = jwt.verify(adevi, secret); // decode token
  if (adevi) {
    return await UserModel.findById(userInfo._id); // find user
  } else {
    return res.status(401).json("unauthorized"); // no token
  }
}

// ====== Profile Route ======
app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // ensure DB connect
  const { adevi } = req.cookies; // get token
  if (adevi) {
    jwt.verify(adevi, secret, {}, (err, userInfo) => {
      if (err) throw err;
      return res.status(200).json(userInfo); // return user data
    });
  } else {
    return res.status(401).json("There is no token"); // no token
  }
});

// ====== Register Route ======
app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // ensure DB connect
  try {
    const { username, email, password } = req.body; // get user data
    const hashedPassword = bcrypt.hashSync(password, salt); // hash password

    const userDoc = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    }); // create user

    const findUser = await UserModel.findOne({ email }); // find user

    if (findUser.email) {
      jwt.sign(
        { id: findUser._id, username, email }, // payload
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          let farFuture = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
          ); // 10 years expiry

          return res
            .status(201)
            .cookie("adevi", token, { expires: farFuture }) // set cookie
            .json({ id: findUser._id, username, email }); // send response
        }
      );
    } else {
      return res.status(200).json({ errorMsg: "Wrong credentials" });
    }
  } catch (err) {
    return res.status(500).json(err); // server error
  }
});

// ====== Login Route ======
app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // ensure DB connect
  try {
    const { email, password } = req.body; // get login data
    const findUser = await UserModel.findOne({ email }); // find user

    if (!findUser) {
      return res.status(200).json({ errorMsg: "Wrong email" });
    }

    const passwordOk = bcrypt.compareSync(password, findUser.password); // check password

    if (passwordOk) {
      jwt.sign(
        { id: findUser._id, username: findUser.username, email },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          let farFuture = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
          ); // 10 years expiry
          return res
            .status(200)
            .cookie("adevi", token, { expires: farFuture }) // set cookie
            .json({ id: findUser._id, username: findUser.username, email }); // send user
        }
      );
    } else {
      return res.status(200).json({ errorMsg: "Wrong password" });
    }
  } catch (err) {
    return res.status(500).json(err); // login error
  }
});

// ====== Create Post ======
app.post("/api/post", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const { adevi } = req.cookies; // get token

  if (!adevi) return res.status(200).json({ errorMsg: "Please sign up" });

  const { author, postedBy, title, body, codeBody, rootId, parentId } = req.body;
  const postDoc = await CommentModel.create({
    author,
    postedBy,
    title,
    body,
    codeBody,
    rootId,
    parentId,
  }); // create comment/post
  return res.status(201).json(postDoc); // return post
});

// ====== Get Comments ======
app.get("/api/comments", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const commentsDoc = await CommentModel.find({ rootId: null }).sort({
    createdAt: -1,
  }); // get main comments
  return res.status(200).json(commentsDoc);
});

app.get("/api/comments/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const id = req.params.id;
  const comment = await CommentModel.findById(id); // get comment by id
  res.status(200).json(comment);
});

app.get("/api/comments/root/:commentId", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const rootId = req.params.commentId;
  const allComments = await CommentModel.find({ rootId }).sort({
    createdAt: -1,
  }); // get child comments
  return res.status(200).json(allComments);
});

// ====== Logout ======
app.post("/api/logout", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  res.status(200).cookie("adevi", "").json("token is empty"); // clear token
});

// ====== Vote Comment ======
app.get("/api/vote/:commentId/:direction", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const adevi = req.cookies.adevi; // get token
  const { commentId, direction } = req.params;

  if (adevi) {
    jwt.verify(adevi, secret, {}, async (err, userInfo) => {
      if (err) throw err;

      await VoteModel.deleteOne({
        commentId,
        email: userInfo.email,
      }).then(async () => {
        if (["up", "down"].indexOf(direction) === -1) {
          res.status(200).json(true); // skip invalid vote
          return;
        }

        await VoteModel.create({
          author: userInfo.username,
          email: userInfo.email,
          commentId,
          direction: direction === "up" ? 1 : -1,
        }).then(() => {
          return res.status(200).json(true); // vote saved
        });
      });
    });
  } else {
    return res.status(200).json("unauthorized"); // no token
  }
});

// ====== Get Vote Totals ======
app.post("/api/votes", (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const { commentsIds } = req.body;
  const adevi = req.cookies.adevi;

  if (adevi) {
    jwt.verify(adevi, secret, {}, async (err, userInfo) => {
      if (err) throw err;

      await VoteModel.find({ commentId: { $in: commentsIds } }).then(
        (votes) => {
          let commentsTotals = {}; // total per comment
          votes.forEach((vote) => {
            if (!commentsTotals[vote.commentId]) {
              commentsTotals[vote.commentId] = 0;
            }
            commentsTotals[vote.commentId] += vote.direction;
          });

          let userVotes = {}; // user’s own votes
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
    return res.status(200).json("unauthorized"); // no token
  }
});

// ====== Delete Comment ======
app.delete("/api/comments/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // connect DB
  const id = req.params.id;
  await CommentModel.findByIdAndDelete(id); // delete comment
  return res.status(200).json(true);
});

// ====== Update Comment ======
app.put("/api/comments/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedDoc = await CommentModel.findByIdAndUpdate(id, data, {
    new: true,
  }); // update comment
  return res.status(200).json(updatedDoc);
});

// ====== Update User ======
app.put("/api/updateprofile", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const dbUser = await UserModel.findOne({ email }); // get user

    if (password && password.length < 6) {
      return res.status(200).json({
        success: false,
        errorMsg: "Password should be 6 char long",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, salt); // hash password
    const hashingPassword = password ? hashedPassword : undefined;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        username: username || dbUser.username,
        password: hashingPassword || dbUser.password,
      },
      { new: true }
    ); // update user

    if (updatedUser.email) {
      jwt.sign(
        { id: dbUser._id, username, email },
        secret,
        {},
        (err, token) => {
          if (err) throw err;

          let farFuture = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
          ); // 10 years expiry

          return res
            .status(201)
            .cookie("adevi", token, { expires: farFuture }) // update cookie
            .json({ id: dbUser._id, username, email }); // return updated
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in update user api",
      error: err,
    });
  }
});

// ====== Start Server ======
if (process.env.PORT) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server running on ${port}`); // log server start
  });
}

module.exports = app; // export app


/**
 * 🛠️ Express Backend for Commenting Platform with Auth (Node.js + MongoDB)
 *
 * ✅ Features Included:
 * - User Authentication (Register, Login, Logout) with JWT + bcrypt
 * - Protected Routes using token from cookie ("adevi")
 * - Create, Read, Update, Delete (CRUD) for Comments (with nested replies)
 * - Voting system on comments (Upvote / Downvote)
 * - Profile and User Update APIs
 *
 * 📦 Tech Stack:
 * - Express for routing
 * - MongoDB (via Mongoose) for data persistence
 * - JWT for token-based auth
 * - bcrypt for password hashing
 * - cookie-parser and cors for middleware
 *
 * 📁 Models Used:
 * - UserModel: Stores user data
 * - CommentModel: Stores comments and nested replies
 * - VoteModel: Tracks up/down votes on comments
 *
 * 📌 Notes:
 * - All major routes start with `/api/...`
 * - Cookies store the JWT token named "adevi"
 * - Votes & replies are linked via comment IDs (rootId, parentId)
 * - DB connection is called in every route (can be optimized)
 */
