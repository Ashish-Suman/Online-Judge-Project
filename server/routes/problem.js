const express = require("express");
const router = express.Router();
const problems = require("../controllers/problems");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../Utilities/authenticate");

router.get("/", verifyUser,problems.index);
router.get("/:id", verifyUser,problems.showProblems);


module.exports = router;
