var fs = require('fs');

var filename = 'input.txt';

var houses = [{x: 0, y: 0, santa: 1, robo: 1}];
var santax = 0;
var santay = 0;

var robox = 0;
var roboy = 0;

function addGift(x,y, isSanta) {
	for(var h of houses) {
		if(h.x === x && h.y === y) {
			if(isSanta) {
				h.santa += 1;
				santax = x;
				santay = y;
			}
			else {
				h.robo += 1;
				robox = x; 
				roboy = y;
			}
			return;
		}
	}

	if(isSanta) {
		houses.push({x: x, y: y, santa: 1, robo: 0});
		santax = x;
		santay = y;
	}
	else {
		houses.push({x: x, y: y, santa: 0, robo: 1});
		robox = x; 
		roboy = y;
	}
}

fs.readFile(filename, 'utf8', function(err, data) {
	var commands = data.split('');
	var count = 0;

	for(c of commands) {

		if(count % 2 === 0) {
			var isSanta = true;
			var x = santax;
			var y = santay;
		}
		else {
			var isSanta = false;
			var x = robox;
			var y = roboy;
		}

		if(c === '<') {
			x -= 1;
		}
		else if(c === '>') {
			x += 1;
		}
		else if(c === '^') {
			y += 1;
		}
		else if(c === 'v') {
			y -= 1;
		}

		addGift(x, y, isSanta);
		count++;
		
	}

	console.log("Part Two: " + houses.length);

});