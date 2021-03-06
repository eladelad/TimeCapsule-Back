/**
 * Created by elad on 04/10/2016.
 */
var passport = require("passport");
var passportJWT = require("passport-jwt");
var models  = require('./models');
var cfg = require('./config/config.json');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        models.User.findOne({attributes: ['firstName', 'lastName', 'email', 'id'],
            where: {
                id: payload.id
        }}).then(function(user){
            if (user) {
                return done(null, user);
            } else {
                return done(new Error("User not found"), null);
            }
        })

    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};