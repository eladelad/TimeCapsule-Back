/**
 * Created by elad on 04/10/2016.
 */
var express = require('express');
var router = express.Router();
var models  = require('../models');
var jwt = require("jwt-simple");
var cfg = require('../config/config.json');

router.post('/', function(req, res) {
    if (req.body.email && req.body.password) {
        console.log(req.body.email);
        models.User.findOne({ where: {email: req.body.email.toLowerCase()} }).then(function(user){
            console.log(user);
            if (user && user.authenticate(req.body.password)) {
                var payload = {id: user.id};
                var token = jwt.encode(payload, cfg.jwtSecret);
                res.json({token: token});
            } else {
                res.sendStatus(401);
            }
        }).catch(function(error){
            console.log(error);
            res.sendStatus(401)
        });

    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
