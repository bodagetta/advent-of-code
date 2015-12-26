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

function findMatches(molecule) {
	var count = 0;

	for(var r of replacements) {
		var regex = new RegExp(r[1], '');

		var newM = molecule.replace(regex, r[0]);

		if(newM != molecule) {
			count++;
		}

		molecule = newM;

	}

	return [molecule, count];
	
}

function executeReplacement(r, molecule) {
	var split = molecule.split('');

	for(var i = 0; i < r[0].length; i++){
		split[r.index + i] = '';
	}

	split[r.index] = r.replacement;


	molecule = split.join('');

	return molecule;

}

function rotateReplacements() {
	replacements.unshift(replacements.pop());
}

fs.readFile(filename, 'utf8', function(err, data) {
	var rows = data.split('\n');
	for (var row of rows) {
		var split = row.split('=>');
		if(split.length == 2) {
			replacements.push([split[0].trim(), split[1].trim()]);
		}
	}

	while(mutated != "e") {
		var mutated = starting;
		var lastMutation = "";
		var steps = 0;

		while(mutated != lastMutation) {
			lastMutation = mutated;
			result = findMatches(mutated)
			mutated = result[0];
			steps = steps + result[1];
		}
		console.log(mutated);
		console.log("--");
		console.log("Mutations: " + steps);
		rotateReplacements();

	}
	
});







