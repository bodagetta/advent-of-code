var fs = require('fs');
var filename = 'input.txt';

var sues = [];

var correctSue = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1
};

function processRow(row) {
	
	var name = /Sue (-?\d+)/.exec(row);
	var children = /children: (-?\d+)/.exec(row);
	var cars = /cars: (-?\d+)/.exec(row);
	var cats = /cats: (-?\d+)/.exec(row);
	var samoyeds = /samoyeds: (-?\d+)/.exec(row);
	var pomeranians = /pomeranians: (-?\d+)/.exec(row);
	var akitas = /akitas: (-?\d+)/.exec(row);
	var vizslas = /vizslas: (-?\d+)/.exec(row);
	var goldfish = /goldfish: (-?\d+)/.exec(row);
	var trees = /trees: (-?\d+)/.exec(row);
	var perfumes = /perfumes: (-?\d+)/.exec(row);


	var sue = {};
	sue.name = name[1];

	if(cars != null) {
		sue.cars = Number(cars[1]);
	}

	if(cats != null) {
		sue.cats = Number(cats[1]);
	}

	if(children != null) {
		sue.children = Number(children[1]);
	}

	if(samoyeds != null) {
		sue.samoyeds = Number(samoyeds[1]);
	}

	if(pomeranians != null) {
		sue.pomeranians = Number(pomeranians[1]);
	}

	if(akitas != null) {
		sue.akitas = Number(akitas[1]);
	}

	if(vizslas != null) {
		sue.vizslas = Number(vizslas[1]);
	}

	if(goldfish != null) {
		sue.goldfish = Number(goldfish[1]);
	}

	if(trees != null) {
		sue.trees = Number(trees[1]);
	}

	if(perfumes != null) {
		sue.perfumes = Number(perfumes[1]);
	}

	return sue;

}

function processRow2(row) {
	
	var name = /Sue (-?\d+)/.exec(row);
	var children = /children: (-?\d+)/.exec(row);
	var cars = /cars: (-?\d+)/.exec(row);
	var cats = /cats: (-?\d+)/.exec(row);
	var samoyeds = /samoyeds: (-?\d+)/.exec(row);
	var pomeranians = /pomeranians: (-?\d+)/.exec(row);
	var akitas = /akitas: (-?\d+)/.exec(row);
	var vizslas = /vizslas: (-?\d+)/.exec(row);
	var goldfish = /goldfish: (-?\d+)/.exec(row);
	var trees = /trees: (-?\d+)/.exec(row);
	var perfumes = /perfumes: (-?\d+)/.exec(row);


	var sue = {};
	sue.name = name[1];

	if(cars != null) {
		sue.cars = Number(cars[1]);
	}

	if(cats != null) {
		sue.cats = Number(cats[1]);
	}

	if(children != null) {
		sue.children = Number(children[1]);
	}

	if(samoyeds != null) {
		sue.samoyeds = Number(samoyeds[1]);
	}

	if(pomeranians != null) {
		sue.pomeranians = Number(pomeranians[1]);
	}

	if(akitas != null) {
		sue.akitas = Number(akitas[1]);
	}

	if(vizslas != null) {
		sue.vizslas = Number(vizslas[1]);
	}

	if(goldfish != null) {
		sue.goldfish = Number(goldfish[1]);
	}

	if(trees != null) {
		sue.trees = Number(trees[1]);
	}

	if(perfumes != null) {
		sue.perfumes = Number(perfumes[1]);
	}

	return sue;

}

function findMatchedSue() {
	for (sue of sues) {
		var matchCount = 0;
		for (var key in sue) {
			if(sue[key] === correctSue[key]) {
				matchCount++;
			}
		}
		if (matchCount === 3) {
			return sue;
		}
	}
}

function findMatchedSue2() {
	for (sue of sues) {
		var matchCount = 0;

		if(sue.hasOwnProperty("cats")) {
			if(sue.cats > correctSue.cats) {
				matchCount++;
			}
			delete sue["cats"];
		}

		if(sue.hasOwnProperty("trees")) {
			if(sue.trees > correctSue.trees) {
				matchCount++;
			}
			delete sue["trees"];
		}

		if(sue.hasOwnProperty("pomeranians")) {
			if(sue.pomeranians < correctSue.pomeranians) {
				matchCount++;
			}
			delete sue["pomeranians"];
		}

		if(sue.hasOwnProperty("goldfish")) {
			if(sue.goldfish < correctSue.goldfish) {
				matchCount++;
			}
			delete sue["goldfish"];
		}

		for (var key in sue) {
			if(sue[key] === correctSue[key]) {
				matchCount++;
			}
		}



		if (matchCount === 3) {
			return sue;
		}
	}
}

fs.readFile(filename, 'utf8', function(err, data) {
	var rows = data.split('\n');
	for (row of rows) {
		var sue = processRow(row);
		sues.push(sue);
	}

	var matchedSue = findMatchedSue();
	var matchedSue2 = findMatchedSue2();
	console.log("Part 1 | Matched Sue: " + matchedSue.name);
	console.log("Part 2 | Matched Sue: " + matchedSue2.name);
});