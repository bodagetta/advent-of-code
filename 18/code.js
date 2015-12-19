var fs = require('fs');

var filename = 'input.txt';
var lights = [];

var maxRow = 0;
var maxCol = 0;

var time = {};

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
	var lightsOn = countLights();
	time.stop = new Date();

	console.log("Part One | Lights on: " + lightsOn);
	console.log(((time.stop - time.start) / 1000) + " seconds");
});