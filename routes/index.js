var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', { solutions: ['consumer','admin','sunvisor'] });
});

router.post('/check', function(req, res, next){
	var cookies = req.cookies;
	console.log(cookies);
	console.log(req.body);
	res.end();
});

function circleFreeObject(obj, parentage, circleFree){
    for(var i in obj){
      if(typeof obj[i] != 'object'){
        if(typeof obj[i] != 'function'){
          circleFree[i] = obj[i];
      }
    } 
    else {

        if( parentage.indexOf(obj[i]) === -1){
          parentage.push(obj[i]);
          circleFree[i] = circleFreeObject( obj[i], parentage, {} ); 
        }
        else { circleFree[i] = "circular ref"; }
    }
  }
  return circleFree; 
}
module.exports = router;
