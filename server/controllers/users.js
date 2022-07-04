const User = require("../models/user");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../Utilities/authenticate");
const jwt = require('jsonwebtoken');


module.exports.register = async(req, res, next) => {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    console.log(req.body);
    const userExist = await User.findOne({username});
    console.log(userExist);
    if(userExist){
        res.statusCode = 409;
        res.json({message: "User Already Exist"});
    }
    User.register(
        new User({ username, email}),
        password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.json(err);
            } else {
                const token = getToken({ _id: user._id });
                const refreshToken = getRefreshToken({ _id: user._id });
                user.refreshToken.push({ refreshToken });
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.json(err);
                    } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                        res.json({ success: true, token });
                    }
                });
            }
        }
    );
}

module.exports.verify = (req, res) => {
    res.statusCode = 200;
    res.json(req.user);
}

module.exports.refreshToken = (req, res, next) => {
  let token = undefined;
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    token = bearer[1];
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if(err){
        console.log("----------------")
      res.status = 401;
      res.json({});
    }
    else{
      console.log(authData);
      res.json({
        message: "success",
        token
      })
    }
  })
}

module.exports.login = (req, res, next) => {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
        user => {
            user.refreshToken.push({ refreshToken })
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.json(err)

                } else {
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                    res.json({ success: true, token })
                }
            })
        },
        err => next(err)
  )
};

module.exports.logout = (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    User.findById(req.user._id).then(
        user => {
        const tokenIndex = user.refreshToken.findIndex(
            item => item.refreshToken === refreshToken
        )
        if (tokenIndex !== -1) {
            user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
        }
        user.save((err, user) => {
            if(err){
                res.statusCode = 500;
                res.json(err);
            } 
            else {
                res.clearCookie("refreshToken", COOKIE_OPTIONS)
                res.json({ success: true })
            }
        })
        },
        err => next(err)
    )
};

