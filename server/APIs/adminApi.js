const exp = require("express");
const adminApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const createUserOrAdmin = require("./createUserOrAdmin");
const Article = require("../models/articleModel");
const User = require("../models/userModel");
const { requireAuth, clerkMiddleware } = require("@clerk/express");
require("dotenv").config();

const checkAdmin = (req, res, next) => {
  if (!req.auth || !req.auth.isAdmin) {
    return res.status(403).send({ message: "Access denied. Admins only." });
  }
  next();
};

adminApp.post("/admin", expressAsyncHandler(createUserOrAdmin));

adminApp.get(
  "/users",
  requireAuth({ signInUrl: "unauthorized" }),
  checkAdmin,
  expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).send({ message: "All users", payload: users });
  })
);

adminApp.put(
  "/toggle-block/:userId",
  requireAuth({ signInUrl: "unauthorized" }),
  checkAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).send({
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      payload: user,
    });
  })
);

adminApp.get(
  "/articles",
  requireAuth({ signInUrl: "unauthorized" }),
  checkAdmin,
  expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const articles = await Article.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).send({ message: "All articles", payload: articles });
  })
);

adminApp.put(
  "/article/:articleId",
  requireAuth({ signInUrl: "unauthorized" }),
  checkAdmin,
  expressAsyncHandler(async (req, res) => {
    const articleId = req.params.articleId;
    const modifiedArticle = req.body;

    const latestArticle = await Article.findByIdAndUpdate(
      articleId,
      { ...modifiedArticle },
      { returnOriginal: false }
    );

    if (!latestArticle) {
      return res.status(404).send({ message: "Article not found" });
    }

    res.status(200).send({
      message: "Article updated successfully",
      payload: latestArticle,
    });
  })
);

adminApp.get("/unauthorized", (req, res) => {
  res.status(401).send({ message: "Unauthorized request" });
});

module.exports = adminApp;
