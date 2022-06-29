//---------------requiring modules------------------
const express = require('express');
const app = express();
const mongoose = require("mongoose");

//---------------end-of-requiring modules------------------


//---------------setting up database----------------
const dbUrl = "mongodb://localhost:27017/online-judge";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connetcted");
});
//---------------end-of-setting-up-database----------------


//--------------starting-up-server-------------------------
const port = 5000;
app.listen(port, () => {
    console.log(`Serving on por ${port}`);
})

//--------------end-of-starting-up-server-------------------------