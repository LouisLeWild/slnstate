var express = require('express');
var router = express.Router();
var fs = require('fs');
var NodeCache = require('node-cache');
var solCache = new NodeCache();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', { solutions: ['consumer','admin','sunvisor'] });
});

router.post('/check', function(req, res, next){
	var cookies = req.cookies;
	// console.log(cookies);
	console.log(req.body);
	console.log(solCache.get(req.body.index));
	res.end();
});

function writePost(body){

}

function readData(){
	return JSON.parse(fs.readFileSync('data.json', 'utf8'));
}

function initCache(){
	var data = readData();
	for(var p in data){
		solCache.set(data[p].index, data[p].isChecked);
	}
}



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
