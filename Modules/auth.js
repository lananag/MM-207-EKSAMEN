const authUtils = require("./auth_utils");
function protect(req, res, next) { //protects from unwanted user access.

    let token = req.headers.authorization; //checking for token.

    if (!token) { //return of error if not found.
        res.status(401).json({error: "no token found, sign in"}).end();
        return;
    }

    let payload = authUtils.verifyToken(token); //verify of token if found.
    if (!payload) {//returning error if invalid.
        res.status(401).json({error: "invalid token"}).end();
        return;
    }

    //function is valid, moving forward.

    res.locals.userid = payload.userid;
    res.locals.username = payload.user;

    next();
}

module.exports = protect;
