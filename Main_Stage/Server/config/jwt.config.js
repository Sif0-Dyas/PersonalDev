const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            console.log(err);
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}