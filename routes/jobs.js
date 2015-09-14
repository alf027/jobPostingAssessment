var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('jobs/index', { title: 'Jobs' });
});

router.get('/new',function(req,res,next){
  res.render('jobs/new',{})
});

module.exports = router;