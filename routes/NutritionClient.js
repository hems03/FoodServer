var request = require('request');
var exports = module.exports;

exports.findNutritionData=function(foods, ref, key) {
	var list = foods.replace("]","").replace("[","").split(", ");
	list.forEach(function(food){
		
        console.log(key);

        var options = {
            headers: 
        {'X-Access-Token': '808275ae4f98fef3'},
            url: 'http://api.nal.usda.gov/ndb/search/?format=json&q='+food+'&sort=n&max=25&offset=0&api_key=IFVem1Ye1SjExjBbPMLlppdh9rY92sGPicLB2tXX&ds=Standard%20Reference',
            method: 'GET'
        };

        function callback(error, response, body) {

            if (!error && response.statusCode == 200) {

                var info = JSON.parse(body);
                console.log(body);
                console.log(JSON.stringify(info));

                 findAndReturnFirst(food,info.list.item[0].ndbno,ref,key);
            }
        }

        request(options, callback);
	





	});

}

function findAndReturnFirst(food, id, ref, key) {
		console.log(key);
		var options = {
	    headers: 
	{'X-Access-Token': '808275ae4f98fef3'},
	    url: 'http://api.nal.usda.gov/ndb/reports/?ndbno='+id+'&type=f&format=json&api_key=IFVem1Ye1SjExjBbPMLlppdh9rY92sGPicLB2tXX',
	    method: 'GET'
	};
 
	function callback(error, response, body) {
		debugger;

	    if (!error && response.statusCode == 200) {
	    	console.log(key);
	    	debugger;

			var info = JSON.parse(body);
			debugger;
			console.log(info.report.food.nutrients);
			var foodname = info.report.food.name;
			var calories = info.report.food.nutrients[1].value;
			var fats=info.report.food.nutrients[4].value;
			var carbs=info.report.food.nutrients[6].value;
			var foodNutrition = {
				calories: calories,
				fats:fats,
				carbohydrate:carbs
			};
			ref.child(key).child("Foods").child(food).update(foodNutrition);
		
			
		
	    }
	}
 
	request(options, callback);
}

