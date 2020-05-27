const checkMillionDollarIdea = (req, res, next) => {
    let weeks = req.body.numWeeks;
    let weekRevenue = req.body.weeklyRevenue;
    if (!weeks || !weekRevenue) {
        res.status(400).send('numWeeks or weeklyRevenue is not provided in idea');
    }
    let annualRevenue = weeks * weekRevenue;
    if (annualRevenue >= 1000000) {
        next();
    } else {
        res.status(400).send('idea not over one mil');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
