var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/new',function(req,res,next){
  var db = req.db;
  var jobs = db.get('jobs');
  console.log(req.params);
  jobs.findOne({_id:req.params.id},function(err,doc){
    res.render('jobs/applications/new',doc);
  })

});

router.post('/',function(req,res,next){
  var db = req.db;
  var applications = db.get('applications');

  var app = req.body;
  app.jobId = req.params.id;

  applications.insert(app,function(err,doc){
    console.log(doc);
    res.redirect('/jobs/'+req.params.id)
  })


});

router.post('/:appId/delete',function(req,res,next){
  console.log(req.params);
  var db = req.db;
  var applications = db.get('applications');

  applications.remove({_id:req.params.appId},function(err,doc){
    console.log(doc);
    res.redirect('/jobs/'+req.params.id)
  })

})



module.exports = router;