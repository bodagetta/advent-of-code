var data = [];

function calcNextValue(value) {
	value = value * 252533;
	value = value % 33554393;
	return value;
}

function addDiagonal() {
	while(r >= 1) {
		v = calcNextValue(row.value);

		row = {row: r, column: c, value: v};
		data.push(row);

		if(r === 2978 && c === 3083) {
			console.log(row);
			process.exit(0);
		}

		r = r - 1;
		c = c + 1;

		
	}

	c = 1;
}

//Push Starting row

var r = 1;
var c = 1;
var v = 20151125;
var maxRow = 1;

var row = {row: r, column: c, value: v};

data.push(row);

while(true) {
	maxRow++;

	r = maxRow;

	addDiagonal();
}




console.log(data);