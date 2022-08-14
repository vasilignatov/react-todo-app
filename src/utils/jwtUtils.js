const jwt = require('jsonwebtoken');



exports.jwtSign = function (payload, secret) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    }); // returns promise
}

