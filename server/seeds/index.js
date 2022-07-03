const mongoose = require("mongoose");
const problems = require("./problems");
const Problem = require("../models/problem");

mongoose.connect("mongodb://localhost:27017/online-judge");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connetcted");
});

const seedDB = async () => {
    await Problem.deleteMany({});
    for(let i = 0; i < problems.length; i++){
        const problemData = problems[i];
        const problem = new Problem({
            title: problemData.title,
            problemStatement: problemData.problemStatement,
            difficulty: problemData.difficulty
        });
        await problem.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close;
    console.log("Data Seed done!");
    console.log("Database closed");
});