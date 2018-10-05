require('../config/config');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/api/login', (req, res) => {

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

        let token = jwt.sign({

            user: userLogged

        }, process.env.TOKEN_SEED, {

            expiresIn: process.env.TOKEN_EXPIRATION

        });

        res.json({

            ok: true,
            userLogged,
            message: "You have logged in succesfully",
            token

        });

    });

});

module.exports = router;