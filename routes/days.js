/**
 * Created by elad on 25/09/2016.
 */
var express = require('express');
var router = express.Router();
var models  = require('../models');
var auth = require("../auth.js")();

router.get('/', auth.authenticate(), function(req, res) {
    var user_id = req.user.id;
    models.Day.findAll({
        where: { user_id: user_id}
    }).then(function(days){
        res.json(days)
    })
});

router.post('/',auth.authenticate(), function(req, res){
    var user_id = req.user.id;
    var r_day = req.body;
    r_day.user_id = user_id;
    console.log(r_day);
    models.Day.create(r_day).then(function (day) {
        res.json(day);
    })
});

module.exports = router;
