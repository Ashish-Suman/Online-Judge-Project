const express = require("express");
const router = express.Router();
const submissions = require("../controllers/submissions");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../Utilities/authenticate");

router.route("/")
    .post(verifyUser, submissions.submit)
    .get(verifyUser,submissions.index);

router.get("/:id", verifyUser,submissions.showSubmission);


module.exports = router;
