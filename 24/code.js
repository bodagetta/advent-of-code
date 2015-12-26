var fs = require('fs');

//var packages = [1,2,3,4,5,7,8,9,10,11];

var packages = [];

var filename = 'input.txt';

function rotate(arr) {
	arr.push(arr.shift());
	return arr;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

fs.readFile(filename, 'utf8', function(err, data) {
	var rows = data.split('\n');
	for(r of rows){
		packages.push(parseInt(r));
	}

	var center = [];

	var targetWeight = 0;

	for(var p of packages) {
		targetWeight += p;
	}
	targetWeight = targetWeight / 3;


	packages = packages.sort(function(a,b){
		return b - a;
	});



	var winners = [];

	for(var k = 0; k < 100000; k++) {

		//Find Center Packages
		var usedPackages = [];

		while(centerWeight != targetWeight) {
			var centerWeight = 0;
			usedPackages = [];

			for(var i = 0; i < packages.length; i++) {
				centerWeight += packages[i];
				usedPackages.push(packages[i]);
				if(centerWeight >= targetWeight) { break; }
			}

			packages = shuffle(packages);

		}

		//Find Side Packages

		var sidepackages = packages.slice(0);

		for(var p of usedPackages) {
			var i = sidepackages.indexOf(p);
			sidepackages.splice(i, 1);
		}

		var side1Packages = [];
		var count = 0;
		var sideWeight1 = 0;

		while(sideWeight1 != targetWeight) {
			sideWeight1 = 0;
			side1Packages = [];

			for(var i = 0; i < sidepackages.length; i++) {
				sideWeight1 += sidepackages[i];
				side1Packages.push(sidepackages[i]);
				if(sideWeight1 >= targetWeight) {break; }
			}

			count++

			if(count > sidepackages.length) {
				//None of the combos add to the total weight
				break;
			}

			sidepackages = rotate(sidepackages);
		}


		//Find Side 2 Packages

		var sidepackages = packages.slice(0);

		for(var p of usedPackages) {
			var i = sidepackages.indexOf(p);
			sidepackages.splice(i, 1);
		}

		for(var p of side1Packages) {
			var i = sidepackages.indexOf(p);
			sidepackages.splice(i, 1);
		}

		var count = 0;
		var sideWeight2 = 0;

		for(var p of sidepackages) {
			sideWeight2 += p;
		}

		//console.log("Side 2 Weight: " + sideWeight2 + ", " + k);

		if(sideWeight2 === targetWeight) { 
			var w = [usedPackages, side1Packages, sidepackages];
			w.sort(function(a,b) {
				return a.length - b.length;
			});
			winners.push(w);
		}
	 


		
		centerWeight = 0;
		sideWeight1 = 0;
		sideWeight2 = 0;
		packages = shuffle(packages);
	}


	winners.sort(function(a,b) {
		return a[0].length - b[0].length;
	});

	var minCenterLength = winners[0][0].length;
	var centerlength = minCenterLength;
	var qe;

	for (w of winners) {
		if(w[0].length > minCenterLength) {
			break;
		}

		var newQe = 1;

		for(a of w[0]) {
			newQe *= a;
		}

		if(!qe) { qe = newQe}

		if(newQe < qe) {
			qe = newQe;
		}
	}

	console.log("Number of winners: " + winners.length);

	console.log(qe);


});


