$(document).ready(function() {

	$(".title-text").html("New header");
	console.log("reload");
	weatherReport();

})


function weatherReport() {
	
	var apiKey       = '7ab2f4ad5bab6d3cffc9d04db6ed14b0',  // Please don't steal...
		url          = 'https://api.darksky.net/forecast/',
		lati         = '37.8267',
		longi        = '-122.4233',
		api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

	var times = [
		[],
		[],
		[],
		[]
	];


	$.getJSON([api_call], function(forecast) {
    
    	for(var j = 0; j < 4; j++) {
    		var time = new Date(forecast.hourly.data[j].time * 1000),
    			chance = forecast.hourly.data[j].precipProbability;

    		times[j].push(time);
    		times[j].push(chance);

    	}
	});

    console.log(times);

}





