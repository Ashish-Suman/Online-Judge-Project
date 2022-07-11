const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const testcaseSchema = new Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Testcase", testcaseSchema);