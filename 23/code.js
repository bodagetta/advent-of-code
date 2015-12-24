var fs = require('fs');
//var filename = 'test.txt';
var filename = 'input.txt';

var instructions = [];
var a = 0;
var b = 0;

function processInstruction(row, index) {
	var row = row.split(' ');
	if(row[0] === 'hlf') {
		if(row[1] === 'a') {
			a = a / 2;
		}
		else if(row[1] === 'b') {
			b = b / 2;
		}
		return ++index;
	}

	if(row[0] === 'tpl') {
		if(row[1] === 'a') {
			a = a * 3;
		}
		else if(row[1] === 'b') {
			b = b * 3;
		}
		return ++index;
	}

	if(row[0] === 'inc') {
		if(row[1] === 'a') {
			a++;
		}
		else if(row[1] === 'b') {
			b++;
		}
		return ++index;
	}

	if(row[0] === 'jmp') {
		return index + Number(row[1]);
	}

	if(row[0] === 'jie') {
		if(row[1] === 'a,') {
			if((a % 2) === 0) {
				return index + Number(row[2]);
			}
			else {
				return ++index;
			}
		}
		else if(row[1] === 'b,') {
			if((b % 2) === 0) {
				return index + Number(row[2]);
			}
			else {
				return ++index;
			}
		}

		return index + Number(row[1]);
	}

	if(row[0] === 'jio') {
		if(row[1] === 'a,') {
			if(a != 1) {
				return ++index;
			}
			else {
				return index + Number(row[2]);
			}
		}
		else if(row[1] === 'b,') {
			if((b % 2) === 0) {
				return ++index;
			}
			else {
				return index + Number(row[2]);

			}
		}

		return index + Number(row[1]);
	}


}

fs.readFile(filename, 'utf8', function(err, data) {
	var instructions = data.split('\n');
	var nextInstr = 0;
	while(nextInstr < instructions.length) {
		nextInstr = processInstruction(instructions[nextInstr], nextInstr);
	}

	console.log("Value for a: " + a);
	console.log("Value for b: " + b);
	
});