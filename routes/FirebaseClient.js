var clarCli=require('./ClarifaiClient');
var nutrCli = require('./NutritionClient');
var firebase = require('firebase/app');
var request = require('request');
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
var ref=db.ref('https:/ruhungry-3cda7,firebaseio,com/');
ref.once('value',function(snap){
	snap.forEach(function(childSnap){
		//debugger;
		var childRef=db.ref('https:/ruhungry-3cda7,firebaseio,com/'+childSnap.key+'/Images/');
		var newChild=false;
		childRef.on('child_added', function(childSnap){
			if(!newChild) return;
			console.log('child child_added');
			clarCli.predictImage(childSnap.child('URL').val(),childRef,childSnap.key);

		})
		childRef.once("value",function(snap){
			newChild=true;
		})
		childRef.on("child_changed", function(snap) {
			if(snap.val().concept!=null&&snap.val().concept.includes("[")){
				
				//debugger;
				console.log(snap.key);
			nutrCli.findNutritionData(snap.val().concept,childRef,snap.key);
			debugger;
			
			
			}
		})
	})
})
/*ref.on('child_added',function(snap){
	console.log('New Values');
	var concepts=clarCli.predictImage(snap.val(),ref,snap.name);;
}, function(error){
	console.log(error.code);
});	*/
