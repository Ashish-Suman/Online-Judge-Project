const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const testcaseSchema = new Schema({
    problemId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
})