var Clarifai=require('clarifai');
var app=new Clarifai.App('bwrRS6mMNw1o3ZxBK2Ashk4jmySk4TrNzOrzwY8y',
	'D9EAKPCY8FxWkwftESoyXzZambequZwDa_XZN0oq')
var exports = module.exports;

exports.predictImage=function(url,ref,snap){
	items=[];
	app.models.predict(Clarifai.FOOD_MODEL, url).then(function(response){
		
		 for(var i=0;i<5;i++) {
		 		if(response.data.outputs[0].data.concepts[i].value>.9){
		    		items.push(response.data.outputs[0].data.concepts[i].name);
				
				ref.child(snap.name).set({
					concept:items[i] //mapping to le database
				});	
		   		 }

		    }
		 

	})
	
};
