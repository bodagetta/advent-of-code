var plotly = require('plotly')("michaelwhitley", "bg5lkec7yn")
var fs = require('fs');

var filename = 'input.txt';
var lights = [];

var maxRow = 0;
var maxCol = 0;

var time = {};

var grid = [];

var plotting = false;

function getLight(x,y) {

	if(x < 0 || y < 0 || x > maxCol - 1 || y > maxRow - 1) {
		return null;
	}

	return lights[y][x];
}

function setNextState(light) {

	//Part Two

	if(light.x === 0 && light.y === 0) {
		light.nextState = true;
		return;
	}

	if(light.x === 0 && light.y === (maxRow - 1)) {
		light.nextState = true;
		return;
	}

	if(light.x === (maxCol - 1) && light.y === 0) {
		light.nextState = true;
		return;
	}

	if(light.x === (maxCol - 1) && light.y === (maxRow - 1)) {
		light.nextState = true;
		return;
	}

	var neighbors = [[-1,-1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 1], [1, 0], [1,-1]];

	var lightsOn = 0;

	for (n of neighbors) {
		var lightToTest = getLight((light.x + n[0]), (light.y + n[1]));

		if(lightToTest != null && lightToTest.isOn === true) {
			lightsOn++;
			
		}
	}

	if (light.isOn) {
		if (lightsOn == 2 || lightsOn == 3) {
			light.nextState = true;
		}
		else {
			light.nextState = false
		}
	}
	else if (lightsOn === 3) {
			light.nextState = true;
	}
	else {
		light.nextState = light.isOn;
	}

}

function assembleLights() {
	for (var rowLight of lights) {
		var row = "";
		for (var light of rowLight) {
			//console.log(light);
			if(light.isOn) {
				row += "#";
			}
			else {
				row += ".";
			}
		}
		//console.log(row);
	}
}

function plot(index) {

	plotting = true;

	var grid = [];

	for (var row of lights) {
		var rowLight = [];
		for (var light of row) {
			if(light.isOn) {
				rowLight.push(1);
			}
			else {
				rowLight.push(0);
			}
		}
		grid.push(rowLight);
	}

	var data = [
	  {
	    z: grid,
	    type: "heatmap"
	  }
	];
	var graphOptions = {filename: "basic-heatmap", fileopt: "overwrite", title: "Advent Of Code - Day 6: Probably a Fire Hazard Part 2"};
	plotly.plot(data, graphOptions, function (err, msg) {
	    //console.log(msg);

	    // grab the figure from an existing plot
		plotly.getFigure('michaelwhitley', '511', function (err, figure) {
		    if (err) return console.log(err);
		    console.log("get figure done");

		    var imgOpts = {
		        format: 'png',
		        width: 500,
		        height: 500
		    };

		    plotly.getImage(figure, imgOpts, function (error, imageStream) {
		        if (error) return console.log (error);

		        var fileStream = fs.createWriteStream( index + '.png');
		        imageStream.pipe(fileStream);
		        plotting = false;
		        console.log("plot done");
		    });
		});
	});
}

function switchState() {
	for(var row of lights) {
		for(var light of row) {
			light.isOn = light.nextState;
			light.nextState = null;
		}
	}
}

function showFrames(frames) {
	for(var i = 0; i < frames; i++) {
		while(plotting);
		plot(i);
		var now = new Date();
		var timeElapsed = (now - time.lap) / 1000;
		time.lap = now;
		for (row of lights) {
			for(light of row){
				setNextState(light);
			}
		}
		switchState();
		console.log("--");
		assembleLights();
	}
}

function countLights() {
	var count = 0;
	for (row of lights) {
		for(light of row) {
			if (light.isOn) {
				count++;
			}
		}
	}
	return count;
}

time.start = new Date();
time.lap = new Date();

fs.readFile(filename, 'utf8', function(err, data) {
	var rows = data.split('\n');
	maxRow = rows.length;
	maxCol = rows[0].split('').length;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var split = row.split('');
		var lightRow = [];
		for (var j =0; j < split.length; j++) {

			var state = true;

			if(split[j] === '.') {
				state = false;
			}

			lightRow.push({x: j, y: i, isOn: state, nextState: null});
		}
		lights.push(lightRow);
	}

	//Part Two
	var l = getLight(0,0);
	l.isOn = true;
	l = getLight(maxCol - 1, maxRow -1);
	l.isOn = true;
	l = getLight(maxCol -1, 0);
	l.isOn = true;
	l = getLight(0, maxRow -1);
	l.isOn = true;

	assembleLights();
	showFrames(100);
	plot();
	var lightsOn = countLights();
	time.stop = new Date();

	console.log("Part One | Lights on: " + lightsOn);
	console.log(((time.stop - time.start) / 1000) + " seconds");
});