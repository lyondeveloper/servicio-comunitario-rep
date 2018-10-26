require('../config/config');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const User = require('../models/User-Model');

class LoginController {

    login(req, res) {
        
        let body = req.body;

        User.findOne({email: body.email}, (err, userLogged) => {

            if (err) {

                return res.status(500).json({

                    ok: false,
                    err

                });

            }

            if (!userLogged) {

                return res.status(400).json({

                    ok: false,
                    message: "(User) or Password are incorrect"

                });

            }

            if (!bcrypt.compareSync(body.password, userLogged.password)) {

                return res.status(400).json({

                    ok: false,
                    message: "User or (password) are incorrect"

                });

            }

            if (userLogged.online == true) {

              return res.status(401).json({

                  ok: false,
                  message: "User already logged in"

              });

            }

            let token = jwt.sign({

                user: userLogged

            }, process.env.TOKEN_SEED, {

                expiresIn: process.env.TOKEN_EXPIRATION

            });

            res.json({

                ok: true,
                userLogged,
                message: "You have logged in succesfully",
                expiresIn: process.env.TOKEN_EXPIRATION,
                token
                
            });

        });
    
    }

}

var loginController = new LoginController();

module.exports = loginController;