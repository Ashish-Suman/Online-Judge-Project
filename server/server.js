//---------------requiring modules------------------
const express = require('express');
const app = express();
const mongoose = require("mongoose");

//---------------end-of-requiring modules------------------



//--------------starting-up-server-------------------------
const port = 5000;
app.listen(port, () => {
    console.log(`Serving on por ${port}`);
})

//--------------end-of-starting-up-server-------------------------