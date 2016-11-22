
var express=require('express');
var clarCli=require('./routes/ClarifaiClient');
//var users=require('./routes/users');

var server=express();
server.get('/images',function (req,response){
	clarCli.predictImage("http://www.cicis.com/media/1138/pizza_trad_pepperoni.png");
	response.send('HELLO!!');
});

server.get('/', function(req,response){
	response.send('What the deal');
})
server.listen(4000,function(err){
	console.log('listening!')
});


