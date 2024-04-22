const { getuser } = require('../service/auth');

function checkforauthorization(req, res, next) {
    const tokencookie = req.cookies?.token;
    // console.log(tokencookie);
    req.user = null;
    if (!tokencookie) return next();

    const token = tokencookie;
    const user = getuser(token);

    req.user = user;
    return next();
}

function restrictto(roles = []) {
    return function (req, res, next) {
        if (!req.user)
            return res.redirect('/login');  // Fix the typo here
        if (!roles.includes(req.user.role))
            return res.end('unauthorized');
        return next();
    };
}

module.exports = { checkforauthorization, restrictto };
