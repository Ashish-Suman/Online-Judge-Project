const express = require("express");
const users = require("../controllers/users");
const passport = require("passport");
const { verifyUser } = require("../Utilities/authenticate");
const router = express.Router({mergeParams: true}); //mergeParams is set to true to have access to params of prefix address

const User = require("../models/user");
const CatchAsync = require("../Utilities/catchAsync");

router.route("/register").post(CatchAsync(users.register));

router.get("/me", verifyUser, (req, res, next) => {
    res.send(req.user)
})

router.route("/login").post(passport.authenticate('local'), users.login);

// router.route("/logout", verifyUser, users.logout);

module.exports = router;
