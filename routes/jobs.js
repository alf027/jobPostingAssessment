var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var db = req.db;
  var jobs = db.get('jobs');

  jobs.find({},function(err,docs){
    res.render('jobs/index', { title: 'Jobs' , jobs:docs});
  })


});

router.get('/new',function(req,res,next){
  res.render('jobs/new',{})
});

router.post('/',function(req,res,next){
  var db = req.db;
  var jobs = db.get('jobs');
  var posting = req.body;
  posting.isOpen = true;
  posting.date = new Date();

  console.log(posting.date.toJSON().slice(0,10));
  console.log(posting);
  jobs.insert(posting,function(err,doc){
    if(err){
      console.log(err)
      res.redirect('/jobs/new')
    } else {
      res.redirect('/jobs')
    }
  })


});

module.exports = router;