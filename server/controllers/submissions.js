const Problem = require("../models/problem");
const Submission = require("../models/submission");
const submissionService = require("../Utilities/submissionService");

module.exports.index = async(req, res) => {
    try{
        const userId = req.user._id;
        const submissions = await (await Submission.find({userId: userId}));
        console.log(submissions);
        res.json({
            success: true,
            submissions
        })
    }
    catch(err){
        console.log(err.message);
        res.sendStatus(500);
    }
}


module.exports.showSubmission = async (req, res) => {
    console.log("showSubmission");
    const submission = await Submission.findById(req.params.id);
    if(!submission){
        res.sendStatusCode(404);
    }
    res.json({
        success: true,
        submission
    })
};



module.exports.submit = async(req, res) => {
    const problem = await (await Problem.findById(req.body.problemId)).populate("Testcases");
    const solution = {
        problemId: req.body.problemId,
        problemName: problem.title,
        userId: req.user._id,
        username: req.user.username,
        code: req.body.code,
        language: req.body.language,
        verdict: "Pending"
    };
    const submission = new Submission(solution);

    
    submissionService.addSubmission(problem, submission, async (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({message: "Something Went Wrong! Try Again!!!"});
        }

        const finalResult = [];
        const verdicts = [],
            testcases = [];


        console.log(result);

        result.forEach((curResult) => {
            const newResult = {};
            const curTestcase = {
                time: curResult.time,
                memory: curResult.memory
            };

            for(let key in curResult){
                if(curResult[key] !== false){
                    newResult[key] = curResult[key];
                }
                if(curResult[key] === true){
                    newResult["verdict"] = key;
                    verdicts.push(key);
                }
            }

            testcases.push(curTestcase);
            finalResult.push(newResult);
        });

        submission.result = testcases;

        if (verdicts.includes("CE")) submission.verdict = "COMPILATION ERROR";
        else if (verdicts.includes("MLE")) submission.verdict = "MEMORY LIMITED EXCEEDED";
        else if (verdicts.includes("TLE")) submission.verdict = "TIME LIMITED EXCEEDED";
        else if (verdicts.includes("RTE")) submission.verdict = "RUNNTIME ERROR";
        else if (verdicts.includes("WA")) submission.verdict = "WRONG ANSWER";
        else if (verdicts.includes("AC")) submission.verdict = "ACCEPTED";

        await submission.save();
        console.log(submission, finalResult);

        return res.send({ verdict: submission.verdict, result: finalResult });
    })
}