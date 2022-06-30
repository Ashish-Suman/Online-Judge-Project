module.exports = func => {
    return (req, res, next) => {
        console.log("hoef");
        func(req, res, next).catch( e => next(e));
    }
}