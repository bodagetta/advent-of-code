var fs = require('fs');
var filename = 'input.txt';

var amountToStore = 25;

var permArr = [];
var usedChars = [];
var rows = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

function matches(combos, newcombo) {
	for(var combo of combos) {
		if(combo.toString() === newcombo.toString()) {
			return true;
		}
	}

	return false;
}

function comboTotal(combo) {
	var total = 0;
	for (var number of combo) {
		total += Number(rows[number]);
	}

	return total;
}

function findCombos(containers) {
	var combos = [];

	for(var container of containers) {
		var amountLeft = amountToStore;
		var innerCombo = [];

		while(amountLeft > 0) {
			if(container.length === 0) {
				amountLeft = 0;
			}
			else if(container[0].value <= amountLeft) {
				amountLeft -= container[0].value;
				innerCombo.push(Number(container[0].index));
				container.shift();
			}
			else{
				container.shift();
			}
			
		}
		innerCombo = innerCombo.sort(function (a, b) { 
		    return a - b;
		});

		if(!matches(combos, innerCombo)) {
			if(comboTotal(innerCombo) === amountToStore) {
				combos.push(innerCombo);
			}
		}

		
	}
	return combos;
}

var time = {start: new Date()};

fs.readFile(filename, 'utf8', function(err, data) {
	rows = data.split('\n');
	var containers = [];
	for(var i in rows) {
		containers.push({index: i, value: rows[i]});
	}
	var combos = permute(containers);
	console.log(combos.length);
	var combinationsToHoldEggnog = findCombos(combos);
	time.stop = new Date();
	console.log("Part One | Combinations to hold eggnog: " + combinationsToHoldEggnog.length);
	console.log((time.stop - time.start) / 1000 + " seconds");

});