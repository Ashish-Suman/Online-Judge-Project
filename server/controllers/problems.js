const Problem = require("../models/problem");
const Submission = require("../models/submission");


module.exports.index = async(req, res) => {
    try{
        const userId = req.user._id;
        const problems = await Problem.find({});
        for(let i = 0; i < problems.length; i++){
            const submission = await Submission.findOne({problemId: problems[i]._id, userId: userId, verdict: "Accepted"});
            if(submission){
                console.log("in Sub")
                problems[i].hasSolved = true;
            }

            console.log(problems[i]);
        }
        res.json({
            success: true,
            problems
        })
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}


module.exports.showProblems = async (req, res) => {
    console.log("showProblems");
    const problem = await Problem.findById(req.params.id);
    if(!problem){
        res.sendStatusCode(404);
    }
    res.json({
        success: true,
        problem
    })
};