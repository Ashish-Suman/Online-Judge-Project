const Problem = require("../models/problem");


module.exports.index = async(req, res) => {
    try{
        const problems = await Problem.find({});
        res.json({
            success: true,
            problems
        })
    }
    catch(err){
        res.sendStatusCode(500);
    }
}


module.exports.showProblems = async (req, res) => {
    const problem = await Problem.findById(req.params.id);
    if(!problem){
        res.sendStatusCode(404);
    }
    res.json({
        success: true,
        problem
    })
};