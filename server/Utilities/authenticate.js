const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

exports.COOKIE_OPTIONS = {
  httpOnly: true,
//   // Since localhost is not having https protocol,
//   // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: 24 * 60 * 60,
  sameSite: "none",
}

exports.getToken = (user) => {
  console.log(user);
  return jwt.sign(user, "secret", {
    expiresIn: 24 * 60 * 60
  })
}

exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 24 * 60 * 60,
  })
  return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })
