
var canvas, ctx,w,h ,init, maxParts, particles;

function setSize () {
	canvas.width = window.innerWidth;
  canvas.height = $(document).height();

  	ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    
    
    init = [];
    maxParts = 1000;
    for(var a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      })
    }
    
    particles = [];
    for(var b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }
}

$(document).ready(function() {
	weatherReport();
	canvas = $('#canvas')[0];
  if(canvas.getContext) {
  	
  	setSize();
    
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for(var c = 0; c < particles.length; c++) {
        var p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      }
      move();
    }
    
    function move() {
      for(var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if(p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      }
    }
    
    setInterval(draw, 30);
    
  }
})

var times = {};


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

function moveBars() {
	$("#box1 .chancebox .grow-box").animate({height: ($("#box1 .chancebox").width() * times[0][1])/100},2000);
	$("#box2 .chancebox .grow-box").animate({height: ($("#box2 .chancebox").width() * times[1][1])/100},2000);
	$("#box3 .chancebox .grow-box").animate({height: ($("#box3 .chancebox").width() * times[2][1])/100},2000);
	$("#box4 .chancebox .grow-box").animate({height: ($("#box4 .chancebox").width() * times[3][1])/100},2000);
}


function weatherReport() {
	
	var lati = -36.854;
		longi = 174.776;

	var apiKey       = '7ab2f4ad5bab6d3cffc9d04db6ed14b0',  // Please don't steal...
		url          = 'https://api.darksky.net/forecast/',
		api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

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
    			chance = forecast.hourly.data[j * 2].precipProbability * 100;

    		times[j][0] = time;
    		times[j][1] = chance;
    	}

    	$("#title-text").html(currentWeather + " and " + Math.round(temperature) + " degrees");

    	$("#sub-text").html(forecast.hourly.summary);

		$("#box1 .percent").html("" + Math.round(times[0][1]) + "%");
		$("#box2 .percent").html("" + Math.round(times[1][1])+ "%");
		$("#box3 .percent").html("" + Math.round(times[2][1]) + "%");
		$("#box4 .percent").html("" + Math.round(times[3][1]) + "%");

		$("#box1 .time-title").html(times[0][0]);
		$("#box2 .time-title").html(times[1][0]);
		$("#box3 .time-title").html(times[2][0]);
		$("#box4 .time-title").html(times[3][0]);

		moveBars()

    });

}

var globalResizeTimer = null;

$(window).resize(function() {
	setSize();
    if(globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
    globalResizeTimer = window.setTimeout(function() {
        moveBars();
    }, 200);
});


