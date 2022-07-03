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
    difficulty: {
        type: String,
        enum : ['EASY' , 'MEDIUM', 'DIFFICULT']
    }
})



module.exports = mongoose.model("Problem", problemSchema);