const User = require("../models/user");
const ExpressError = require("../Utilities/ExpressError");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../Utilities/authenticate");


module.exports.register = async(req, res, next) => {
    const {email, username, password} = req.body;
    const user = new User({email, username});

    const userExist = await User.findOne({username});
    if(userExist){
        return next(new ExpressError("User Already Exist", 400));
    }
    User.register(
        new User({ username, email}),
        password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.send(err);
            } else {
                const token = getToken({ _id: user._id });
                const refreshToken = getRefreshToken({ _id: user._id });
                user.refreshToken.push({ refreshToken });
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                        res.send({ success: true, token });
                    }
                });
            }
        }
    );
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
                    res.send(err)

                } else {
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

