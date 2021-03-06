var express = require('express');
var router = express.Router();



router.get('/', function (req, res, next) {
  var db = req.db;
  var jobs = db.get('jobs');

  jobs.find({isOpen:true},{sort:{date: -1}}, function (err, docs) {
    for(var i =0 ;i<docs.length;i++){
      var date = docs[i].date.toJSON().slice(0, 10);
      docs[i].date = date;
    }

    res.render('jobs/index', {title: 'Jobs', jobs: docs});
  })
});

router.post('/', function (req, res, next) {
  var db = req.db;
  var jobs = db.get('jobs');
  var posting = req.body;
  posting.isOpen = true;
  posting.date = new Date();


  console.log(posting);
  jobs.insert(posting, function (err, doc) {
    if (err) {
      console.log(err)
      res.redirect('/jobs/new')
    } else {
      res.redirect('/jobs')
    }
  })
});

router.get('/new', function (req, res, next) {
  res.render('jobs/new', {})
});

router.get('/:id/edit', function (req, res, next) {
  var db = req.db;
  var jobs = db.get('jobs');
  jobs.findOne({_id: req.params.id}, function (err, job) {
    res.render('jobs/edit', job)
  });
});

router.post('/:id/', function (req, res, next) {
  console.log(req.body);
  var db = req.db;
  var jobs = db.get('jobs');
  var job = req.body;
  if(job.isOpen) {
    job.isOpen=true;
  } else {
    job.isOpen=false;
  }

  jobs.findAndModify({_id: req.params.id}, {
    $set: {
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      description: req.body.description,
      responsibilities: req.body.responsibilities,
      isOpen: req.body.isOpen
    }
  },function(err,doc){
    console.log(doc);
    res.redirect(doc._id)
  });
});

router.post('/:id/delete',function(req,res,next){
  var db = req.db;
  var jobs = db.get('jobs');

  jobs.remove({_id:req.params.id},function(err,doc){
    res.redirect('/jobs')
  })
});

router.get('/:id', function (req, res, next) {
  var db = req.db;
  var jobs = db.get('jobs');
  var applicants = db.get('applications');

  jobs.findOne({_id: req.params.id}, function (err, job) {
    applicants.find({jobId: req.params.id}, function (err, apps) {
      job.applicants = apps;
      console.log(apps);
      console.log(job);
      job.date = job.date.toJSON().slice(0, 10);
      res.render('jobs/show', job)
    })

  });

});


module.exports = router;