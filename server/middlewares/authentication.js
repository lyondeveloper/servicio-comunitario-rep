const jwt = require('jsonwebtoken');

/** 
 * 
 * verify token
 * 
*/
let verifyToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {

            return res.status(500).json({

                ok: false,
                err,
                message: "Token not valid"

            });

        }

        req.user = decoded.user;

        next();

    });

}

/** 
 * 
 * verify role
 * 
*/

let verifyRole = (req, res, next) => {

    let user = req.user;

    if (user.role !== 'SUPER_ADMIN') {

        return res.status(500).json({

            ok: false,
            message: "You are not allowed to do this"
        
        });

    } else {

        next();
    
    }
 
}

module.exports = {

    verifyToken,
    verifyRole

}