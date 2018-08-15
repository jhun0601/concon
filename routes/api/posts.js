const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//load validation
const validatePostInput = require("../../validation/post");

//load model
const Post = require("../../models/Post");

// @routes  GET api/posts/test
// @desc    test posts route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @routes  POST api/posts
// @desc    Create post
// @access  private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      //if any errors send return 400
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
