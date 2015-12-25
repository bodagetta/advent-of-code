//Part One

var fs = require('fs');
var filename = 'input.txt';

var replacements = [];

var starting = "CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr";

var output = [];

var possibleReplacements = [];

var newMolecules = [];

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
		console.log(r);
		var regex = new RegExp(r[0], 'g');
		var matches;

		while (matches = regex.exec(starting)) {
			matches.replacement = r[1];
			possibleReplacements.push(matches);
		}

	}

	for(p of possibleReplacements) {
		var newCombo = starting.split('');
		if(p[0].length === 2) {
			newCombo[p.index + 1] = '';
		}
		newCombo[p.index] = p.replacement;
		newCombo = newCombo.join('');
		p.newString = newCombo;
		addMolecule(newCombo);

	}

	console.log(newMolecules.length);
}

fs.readFile(filename, 'utf8', function(err, data) {
	var rows = data.split('\n');
	for (var row of rows) {
		var split = row.split('=>');
		if(split.length == 2) {
			replacements.push([split[0].trim(), split[1].trim()]);
		}
	}
	findMatches();
});







