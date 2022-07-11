require('dotenv').config()
//---------------importing-modules------------------
const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const ExpressError = require("./Utilities/ExpressError");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



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
const problemRoutes = require("./routes/problem");
const submissionRoutes = require("./routes/submisstion");

//---------------end-of-requiring-routes----------------------------






//---------------middlewares-------------------------------------
//To log incoming requests
app.use(morgan("tiny"));
app.use(bodyParser.json());

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(passport.initialize());
//---------------end-of-middlewares-------------------------------



//---------------routes------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes)



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