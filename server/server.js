require('dotenv').config()
//---------------importing-modules------------------
const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const ExpressError = require("./Utilities/ExpressError");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



//---------------setting-up-database----------------
const dbUrl = "mongodb://localhost:27017/online-judge";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connetcted");
});


//---------------end-of-setting-up-database----------------


require("./strategies/jwtStrategy")
require("./strategies/localStrategy")
require("./Utilities/authenticate")

//---------------end-of-importing modules------------------

//---------------requiring-routes-----------------------------------
const userRoutes = require("./routes/user");

//---------------end-of-requiring-routes----------------------------






//---------------middlewares-------------------------------------
//To log incoming requests
app.use(morgan("tiny"));
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(passport.initialize());
//---------------end-of-middlewares-------------------------------



// //---------------passport-config---------------

// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// // passport.deserializeUser(User.deserializeUser());

//---------------end-of-passport-config-----------------------


//---------------routes------------------------------------
app.use("/api/users", userRoutes);



app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message
    })
})

//---------------end-of-routes----------------------------


//--------------starting-up-server-------------------------
const port = 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});

//--------------end-of-starting-up-server-------------------------