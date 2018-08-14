const express = require("express");
const router = express.Router();

// @routes  GET api/posts/test
// @desc    test posts route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

module.exports = router;
