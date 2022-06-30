const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const submissionSchema = new Schema({
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        required: true
    }
})