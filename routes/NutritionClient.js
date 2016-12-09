var request = require('request');
var PyShell=require('python-shell');
var pyShell= new PyShell('scrape.py');

var exports = module.exports;
var menu;

var interval = setInterval(function() {
  PyShell.run('scrape.py', function (err) {
  if (err) throw err;
  console.log('finished');
});
}, 1000*60*60*24);



pyShell.on('message', function(message){
	
	menu=JSON.parse(message);
	var concs=["pizza", "salad"];
	console.log(exports.findRutgersFood(concs));
	
	
	
	
})

exports.findRutgersFood=function(concepts){
	
	var rutgersFoods=[];
	for (var i=0;i<menu.length;i++){
		
		var menuObj=menu[i].meals;
		for (var j=0;j<menuObj.length;j++){
			var genreObj=menuObj[j].genres;
			
			
			for(var k=0;k<genreObj.length;k++){
				var rutFood=genreObj[k];
				
				for(var w=0;w<rutFood.items.length;w++){
					var foodObj=rutFood.items[w];
					
					if(foodObj.hasOwnProperty('items')){
						
						//console.log(foodObj);
						foodObj=foodObj.items;
					}
					for(var i in concepts){
						if(foodObj.name.indexOf(concepts[i]>0)){
							rutgersFoods.push(JSON.stringify(foodObj.name));
						}
					}
					
				}
					
				
			}
			
		}	
	}
	return (rutgersFoods);
}

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





