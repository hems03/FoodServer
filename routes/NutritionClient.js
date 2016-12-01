var request = require('request');

exports.findNutritionData=function(foods) {
	var list = foods.replace("]","").replace("[","").split(", ");

	console.log("hi ");
}


var options = {
	    headers: 
	{'X-Access-Token': '808275ae4f98fef3'},
	    url: 'http://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=316+W.+Washington+Ave.+Madison,+WI',
	    method: 'GET'
	};
 
	function callback(error, response, body) {
	    if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		console.log(body);
	    }
	}
 
	request(options, callback);