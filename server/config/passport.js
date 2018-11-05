require('../config/config');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

//Load User Model
const User = require('../models/User');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SEED;

module.exports = passport => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        User.findById({_id: jwt_payload.id}, (error, user) => {

            if (error) {

                console.log(error);

            }

            if (user) {
              
                return done(null, user);

            }

            return done(null, false);

        });

    }));

}