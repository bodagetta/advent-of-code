var fs = require('fs');
var filename = 'input.txt';

var amountToStore = 150;

var combos = [];
var containers = [];

var winners = [];
var losers = [];

var time = {start: new Date()};

function comboCapacity(c) {
	var total = 0;
	for (var i = 0; i < c.length; i++) {
		total += c[i].value;
	}
	return total;
}

function findCombos() {


	for(var i = 0; i < containers.length; i++) {
		var c = containers[i];
		var r = containers.slice(0);
		r.splice(i,1);
		combos.push({
			combo: [containers[i]], 
			remaining: r
		});
	}

	while(combos.length > 0) {
		console.log(combos.length);
		for(var i = 0; i < combos.length; i++) {
			for(var j = 0; j < combos[i].remaining.length; j++) {

				var clonedCombo = JSON.parse(JSON.stringify(combos[i]));
				clonedCombo.combo.push(combos[i].remaining[j]);
				clonedCombo.remaining.splice(j, 1);

				if(comboCapacity(clonedCombo.combo) === amountToStore) {
					addCombo(clonedCombo);
					continue;
				}
				else if(comboCapacity(clonedCombo.combo) < amountToStore) {
					combos.push(clonedCombo);
				}
				else if(comboCapacity(clonedCombo.combo) > amountToStore) {
					//losers.push(clonedCombo);
					continue;
				}
			}

			combos.splice(i, 1);
		}
	}


}

function addCombo(c) {
	var shouldPush = true;
	c.combo.sort(function(a,b) {
		return a.index - b.index;
	});

	var cString = JSON.stringify(c.combo);

	for(var w of winners) {
		var wString = JSON.stringify(w.combo);
		if (wString == cString) {
			shouldPush = false;
		}
	}

	if(shouldPush) {
		winners.push(c);
	}
	
}


function finish() {
	time.stop = new Date();
	console.log("Part One | Combinations to hold eggnog: " + winners.length);
	console.log((time.stop - time.start) / 1000 + " seconds");

	var minimum = winners[0].combo.length;

	var mimimumCount = 0;
	for(var i = 0; i < winners.length; i++) {
		var w = winners[i];
		if(w.combo.length === minimum) {
			mimimumCount++;
		}
	}

	console.log("Part Two | Minimum to hold: " + mimimumCount);
}

fs.readFile(filename, 'utf8', function(err, data) {
	rows = data.split('\n');
	for(var i in rows) {
		containers.push({index: i, value: parseInt(rows[i])});
	}
	findCombos();
	finish();

});