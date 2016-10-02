var express = require('express');
var router = express.Router();
var models  = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

router.post('/create', function(req, res){

  var r_user = req.body;
  console.log(r_user);
  models.User.create(r_user).then(function () {
    res.json({ok: 'ok'});
  })
})

router.get('/:user_id/days/', function(req, res, next) {
  var user_id = req.params.user_id;
  models.Day.findAll({
    where: { user_id: user_id}
  })

});

router.post('/:user_id/days/create', function(req, res){
  var user_id = req.params.user_id;
  var r_day = req.body;
  r_day.user_id = user_id;
  console.log(r_day);
  models.Day.create(r_day).then(function () {
    res.json({ok: 'ok'});
  })
})

module.exports = router;
