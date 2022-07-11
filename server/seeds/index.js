const mongoose = require("mongoose");
const problems = require("./problems");
const Problem = require("../models/problem");
const Testcase = require("../models/testcase");

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
        const testcases = [];
        for(let j = 0; j < problemData.testcases.length; j++){
            const testcase = new Testcase({
                input: problemData.testcases[i].input,
                output: problemData.testcases[i].output
            })
            await testcase.save();
            testcases.push(testcase);
        }
        const problem = new Problem({
            title: problemData.title,
            problemStatement: problemData.problemStatement,
            difficulty: problemData.difficulty,
            Testcases: testcases
        });
        await problem.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close;
    console.log("Data Seed done!");
    console.log("Database closed");
});