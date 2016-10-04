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


module.exports = router;
