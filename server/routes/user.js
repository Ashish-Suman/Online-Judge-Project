const express = require("express");
const router = express.Router();
const user = require("../controllers/users");
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../Utilities/authenticate");

router.post("/register", user.register);

router.post("/login", passport.authenticate("local", {session: false}), user.login);

router.post("/refreshToken", verifyUser, user.refreshToken);

router.post("/verifyUser", verifyUser, user.verify);

router.get("/logout", verifyUser, user.logout);
module.exports = router;
