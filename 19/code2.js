//Part Two

var fs = require('fs');
var filename = 'input.txt';

var replacements = [];

var starting = "CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr";
//var starting = "HOH";

var output = [];

var possibleReplacements = [];

var newMolecules = [];
var steps = 1;

function addMolecule(molecule) {

	for(var m of newMolecules) {
		if (m === molecule) {
			return;
		}
	}

	newMolecules.push(molecule);
}

function findMatches() {

	for(var r of replacements) {
		var regex = new RegExp(r[1], 'g');

		while(matches = regex.exec(starting)) {
			matches.replacement = r[0];
			executeReplacement(matches);
			possibleReplacements.push(matches);
		}

	}
	
}

function executeReplacement(r) {
	var split = starting.split('');

	for(var i = 0; i < r[0].length; i++){
		split[r.index + i] = '';
	}

	split[r.index] = r.replacement;


	starting = split.join('');

	split = starting.split('');
		for(var s of split) {
			if(s != 'e') {
				console.log(starting);
				steps++;
				return;
			}
		}

	console.log("Steps: " + steps);
	process.exit(0);


 
}

fs.readFile(filename, 'utf8', function(err, data) {
	var rows = data.split('\n');
	for (var row of rows) {
		var split = row.split('=>');
		if(split.length == 2) {
			replacements.push([split[0].trim(), split[1].trim()]);
		}
	}
	while(true) {
		findMatches();
	}
	
	console.log(starting);
});







