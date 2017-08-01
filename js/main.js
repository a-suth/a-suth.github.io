$(document).ready(function() {
	weatherReport();

})


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function weatherReport() {
	
	var lati = 56.817,
		longi = -5.112;

	/*getLocation(function(pos){
		longi = pos.longi;
		lati = pos.latiquestion;
	});*/

	var apiKey       = '7ab2f4ad5bab6d3cffc9d04db6ed14b0',  // Please don't steal...
		url          = 'https://api.darksky.net/forecast/',
		api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

	var times = {};

	for (var i = 0; i < 4; i++) {
		times[i] = {};
	};

	$.getJSON([api_call], function(forecast) {
    
    	console.log(forecast);

    	var location, temperature, currentWeather, currentRain;

    	temperature = (forecast.currently.apparentTemperature - 32) * 5 / 9;
    	currentWeather = forecast.currently.summary;
    	location = "Auckland";
    	currentRain = forecast.currently.precipIntensity; 


    	for(var j = 0; j < 4; j++) {
    		var time = formatAMPM(new Date(forecast.hourly.data[j * 2].time * 1000)),
    			chance = forecast.hourly.data[j].precipProbability * 100;

    		times[j][0] = time;
    		times[j][1] = chance;
    	}

    	$("#title-text").html(currentWeather + " and " + Math.round(temperature) + " degrees");

    	$("#sub-text").html(forecast.hourly.summary);

		$("#box1 .percent").html("" + times[0][1] + "%");
		$("#box2 .percent").html("" + times[1][1] + "%");
		$("#box3 .percent").html("" + times[2][1] + "%");
		$("#box4 .percent").html("" + times[3][1] + "%");

		$("#box1 .time-title").html(times[0][0]);
		$("#box2 .time-title").html(times[1][0]);
		$("#box3 .time-title").html(times[2][0]);
		$("#box4 .time-title").html(times[3][0]);


    });

}





