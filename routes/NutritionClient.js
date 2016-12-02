var request = require('request');
var exports = module.exports;

exports.findNutritionData=function(foods, ref, snap) {
	var list = foods.replace("]","").replace("[","").split(", ");
	var food = list[0];
	console.log(list);

	var options = {
	    headers: 
	{'X-Access-Token': '808275ae4f98fef3'},
	    url: 'http://api.nal.usda.gov/ndb/search/?format=json&q='+food+'&sort=n&max=25&offset=0&api_key=IFVem1Ye1SjExjBbPMLlppdh9rY92sGPicLB2tXX&ds=Standard%20Reference',
	    method: 'GET'
	};
 
	function callback(error, response, body) {
		debugger;
	    if (!error && response.statusCode == 200) {
	    	debugger;
		var info = JSON.parse(body);
		console.log(body);
		console.log(JSON.stringify(info));
		debugger;
		return findAndReturnFirst(food,info.list.item[0].ndbno,ref,snap);
	    }
	}
 
	request(options, callback);
}

function findAndReturnFirst(id, ref, snap) {
	
		var options = {
	    headers: 
	{'X-Access-Token': '808275ae4f98fef3'},
	    url: 'http://api.nal.usda.gov/ndb/reports/?ndbno='+id+'&type=f&format=json&api_key=IFVem1Ye1SjExjBbPMLlppdh9rY92sGPicLB2tXX',
	    method: 'GET'
	};
 
	function callback(food,error, response, body) {
		debugger;

	    if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		var foodname = info.report.food.name;
		var calories = info.report.food.nutrients[1].value;
		var food = {
			calories: calories
		};
		ref.child(snap.key).child(food).update(food);
		
		console.log(food);
		
	    }
	}
 
	request(options, callback);
}

