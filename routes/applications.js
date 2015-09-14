var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/',function(req,res,next){
  console.log(req.params);
  res.render('jobs/applications/new',{})
});



module.exports = router;