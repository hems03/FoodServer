var request = require('request');
var exports = module.exports;

exports.findNutritionData=function(foods) {
	var list = foods.replace("]","").replace("[","").split(", ");
	var food = "";

	var options = {
	    headers: 
	{'X-Access-Token': '808275ae4f98fef3'},
	    url: 'http://api.nal.usda.gov/ndb/search/?format=json&q='+food+'&sort=n&max=25&offset=0&api_key=IFVem1Ye1SjExjBbPMLlppdh9rY92sGPicLB2tXX&ds=Standard%20Reference',
	    method: 'GET'
	};
 
	function callback(error, response, body) {
	    if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		return findAndReturnFirst(info.list.item[0].nbdno);
	    }
	}
 
	request(options, callback);
}

function findAndReturnFirst(id) {
		var options = {
	    headers: 
	{'X-Access-Token': '808275ae4f98fef3'},
	    url: 'http://api.nal.usda.gov/ndb/reports/?ndbno='+id+'&type=f&format=json&api_key=IFVem1Ye1SjExjBbPMLlppdh9rY92sGPicLB2tXX',
	    method: 'GET'
	};
 
	function callback(error, response, body) {
	    if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		var foodname = info.report.food.name;
		var calories = info.report.food.nutrients[1].value;
		var food = {
			foodname: foodname,
			calories: calories
		};
		return food;
	    }
	}
 
	request(options, callback);
}

