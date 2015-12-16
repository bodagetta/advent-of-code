var fs = require('fs');

var filename = 'input.txt';

fs.readFile(filename, 'utf8', function(err, data) {

	var floor = 0;
	var basementInstruction = 0;

	var instructions = data.split('');

	for (var index in instructions) {

		var instruction = instructions[index];

		if(instruction === '(') {
			floor += 1;
		}
		else if(instruction === ')') {
			floor -= 1;
		}

		if(floor === -1 && basementInstruction === 0) {
			//Index is zero based and directions state that the first character is position 1
			basementInstruction = Number(index) + 1;
		}
	}

	console.log("Part One | Final Floor: " + floor);
	console.log("Part Two | First Basement Instruction: " + basementInstruction);
});