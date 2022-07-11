const Problem = require("../models/problem");
const Submission = require("../models/submission");
const submissionService = require("../Utilities/submissionService");

module.exports.index = async(req, res) => {
    try{
        const userId = req.user._id;
        const submissions = await Submission.find({userId: req.user._id});
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
    const solution = {
        problemId: req.body.problemId,
        userId: req.user._id,
        code: req.body.code,
        language: req.body.language,
        verdict: ""
    };
    const submission = new Submission(solution);

    const problem = await (await Problem.findById(req.body.problemId)).populate("Testcases");
    submissionService.addSubmission(problem, submission, (err, result) => {
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

        if (verdicts.includes("CE")) submission.verdict = "CE";
        else if (verdicts.includes("MLE")) submission.verdict = "MLE";
        else if (verdicts.includes("TLE")) submission.verdict = "TLE";
        else if (verdicts.includes("RTE")) submission.verdict = "RTE";
        else if (verdicts.includes("WA")) submission.verdict = "WA";
        else if (verdicts.includes("AC")) submission.verdict = "AC";


        console.log(submission.verdict, finalResult);

        return res.send({ verdict: submission.verdict, result: finalResult });
    })
}