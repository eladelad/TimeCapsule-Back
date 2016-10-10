var express = require('express');
var router = express.Router();
var models  = require('../models');
var cfg = require('../config/config.json');
var jwt = require('jwt-simple');
var auth = require('../auth.js')();
/* GET users listing. */

router.get('/', auth.authenticate(), function(req, res){
  var user = req.user;
  console.log("Got user", user);
  res.json(user)
});

router.post('/', function(req, res){

  var r_user = req.body;
  console.log(r_user);
  models.User.create(r_user).then(function (user) {
    var payload = {id: user.id};
    var token = jwt.encode(payload, cfg.jwtSecret);
    res.json({token: token});
  })
});

router.post('/exist', function(req, res){

    var email = req.body.email;
    console.log('Checking Email ', email);
    models.User.findOne({ where: {email: req.body.email.toLowerCase()} }).then(function(user){
        console.log(user);
        if (user && user.email) {
            res.json({code: 0, msg:'No Such Email'});
        } else {
            res.json({code: 1, msg:'Email Exists'});
        }
    }).catch(function(error){
        console.log(error);
        res.sendStatus(404)
    });
});


module.exports = router;
