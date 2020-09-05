const jwt = require('jsonwebtoken');
const SecretKey = require("../config/jwt.json").secretKey;

module.exports = {
    verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // console.log(bearerHeader);
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // check if the token is valid
            if (bearer[1]) {
                // Get token from array
                const bearerToken = bearer[1];
                // Set the token
                const token = bearerToken;
                // start verifying the token
                jwt.verify(token, SecretKey, (err, authData) => {
                    if (err) {
                        // Forbidden
                        res.sendStatus(403);
                    } else {
                        // save the user's data
                        req.authData = authData;
                        // Next middleware
                        next();
                    }
                });
            } else {
                // Key Name doesn't correspond to the config
                res.sendStatus(403);
            }
        } else {
            // Forbidden if the token isn't submitted
            res.sendStatus(403);
        }
    }
}