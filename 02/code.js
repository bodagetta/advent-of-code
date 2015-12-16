var fs = require('fs');

var filename = 'input.txt';

function getPaperSize(row) {
	var split = row.split('x');
	var side1 = 2 * Number(split[0]) * Number(split[1]);
	var side2 = 2 * Number(split[1]) * Number(split[2]);
	var side3 = 2 * Number(split[2]) * Number(split[0]);
	var smallestSide = side1;

	if(side2 < smallestSide) {
		smallestSide = side2;
	}

	if(side3 < smallestSide) {
		smallestSide = side3;
	}

	return side1 + side2 + side3 + (smallestSide / 2);
}

function getRibbonLength(row) {

	var split = row.split('x');
	var l = Number(split[0]);
	var w = Number(split[1]);
	var h = Number(split[2]);
	var dimensions = [l,w,h];
	dimensions.sort(function (a, b) { 
	    return a - b;
	});

	var volume = l*w*h;

	var length = volume + dimensions[0]*2 + dimensions[1]*2;
	
	return length;
}

fs.readFile(filename, 'utf8', function(err, data) {

	var rows = data.split('\n');
	var totalPaperNeeded = 0;
	var totalRibbonNeeded = 0;

	for (var row of rows) {
		totalPaperNeeded += getPaperSize(row);
		totalRibbonNeeded += getRibbonLength(row);
	}

	console.log("Part One | Paper Needed: " + totalPaperNeeded);
	console.log("Part Two | Ribbon Needed: " + totalRibbonNeeded);

});