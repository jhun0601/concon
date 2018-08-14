const express = require("express");
const moongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//Load Profile model
const Profile = require("../../models/Profile");
//Load User model
const User = require("../../models/User");

// @routes  GET api/profile/test
// @desc    test profile route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @routes  GET api/profile
// @desc    Get current user profile
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          //   errors.noprofile = "There is no Profile for this User";
          return res
            .status(404)
            .json({ msg: "There is no Profile for this User" });
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
