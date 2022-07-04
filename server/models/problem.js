const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    }
})



module.exports = mongoose.model("Problem", problemSchema);