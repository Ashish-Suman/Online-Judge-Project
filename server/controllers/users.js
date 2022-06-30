const User = require("../models/user");
const ExpressError = require("../Utilities/ExpressError");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../Utilities/authenticate");


module.exports.register = async (req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        console.log(user);
        const userExist = await User.findOne({username});
        console.log(userExist);
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        res.send(registeredUser);
    } catch (e){
        res.send(e);
    }
}

module.exports.login = (req, res, next) => {
    console.log("Login");
    const token = getToken({ _id: req.user._id })
    console.log(token);
    const refreshToken = getRefreshToken({ _id: req.user._id })
    console.log(refreshToken);
    User.findById(req.user._id).then(
        user => {
            user.refreshToken.push({ refreshToken })
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)

                } else {
                    console.log(token);
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                    res.send({ success: true, token })
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
                res.send(err);
            } 
            else {
                res.clearCookie("refreshToken", COOKIE_OPTIONS)
                res.send({ success: true })
            }
        })
        },
        err => next(err)
    )
};

