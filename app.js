var firCli=require('./routes/FirebaseClient');
var express=require('express');
var clarCli=require('./routes/ClarifaiClient');
var handlebars=require('express-handlebars').create({defaultLayout:'main'});

//var users=require('./routes/users');

var server=express();
server.engine('handlebars', handlebars.engine);
server.set('view engine','handlebars');

server.get('/', function(req,response){
	response.send('What the deal');
})
server.listen(4000);


