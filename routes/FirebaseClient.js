var clarCli=require('./ClarifaiClient');
var firebase = require('firebase/app');
require('firebase/database');

var admin=require('firebase-admin');
firebase.database.enableLogging(false);
admin.database.enableLogging(true);
var serv=require('/home/hemanth/Documents/RUHungry-daa2d6cfe8c5.json');
admin.initializeApp({
	credential:admin.credential.cert(serv),
	databaseURL:'https://ruhungry-3cda7.firebaseio.com'
	});

var config={
	serviceAccount:'./home/hemanth/Documents/RUHungry-daa2d6cfe8c5.json',
	databaseURL:'https://ruhungry-3cda7.firebaseio.com'
}


var db=admin.database();
var ref=db.ref('https:/ruhungry-3cda7,firebaseio,com/Images');
ref.on('child_added',function(snap){
	console.log('New Values');
	var concepts=clarCli.predictImage(snap.val(),ref,snap.name);;
}, function(error){
	console.log(error.code);
});	
