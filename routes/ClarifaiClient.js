var Clarifai=require('clarifai');
var app=new Clarifai.App('bwrRS6mMNw1o3ZxBK2Ashk4jmySk4TrNzOrzwY8y',
	'D9EAKPCY8FxWkwftESoyXzZambequZwDa_XZN0oq')
var exports = module.exports;
exports.predictImage=function(url){
	app.models.predict(Clarifai.GENERAL_MODEL, url).then(
  function(response) {
    // do something with response
    console.log('response');
    var items=[];
	for(var i in response.data.outputs[0].data.concepts) {
		items.push(response.data.outputs[0].data.concepts[i].name);
		console.log(items[i]);
	}
  },
  function(err) {
    // there was an error
  }
);
	
};
