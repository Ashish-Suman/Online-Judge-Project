const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const testcase = require("./testcase");

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    Example: {
        type: String
    },
    difficulty: {
        type: String,
        enum : ['EASY' , 'MEDIUM', 'DIFFICULT']
    },
    hasSolved: {
        type: Boolean,
        default: false
    },
    Testcases: [
        {
            type: Schema.Types.ObjectId,
            ref: "Testcase"
        }
    ]
})



module.exports = mongoose.model("Problem", problemSchema);