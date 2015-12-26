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
	targetWeight = targetWeight / 4;


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

		//Find Side 1 Packages

		var remainingPackages = packages.slice(0);

		for(var p of usedPackages) {
			var i = remainingPackages.indexOf(p);
			remainingPackages.splice(i, 1);
		}

		var side1Packages = [];
		var count = 0;
		var sideWeight1 = 0;

		while(sideWeight1 != targetWeight) {
			sideWeight1 = 0;
			side1Packages = [];

			for(var i = 0; i < remainingPackages.length; i++) {
				sideWeight1 += remainingPackages[i];
				side1Packages.push(remainingPackages[i]);
				if(sideWeight1 >= targetWeight) {break; }
			}

			count++

			if(count > remainingPackages.length) {
				//None of the combos add to the total weight
				break;
			}

			remainingPackages = rotate(remainingPackages);
		}

		//Find Side 2 Packages

		var remainingPackages = packages.slice(0);

		for(var p of usedPackages) {
			var i = remainingPackages.indexOf(p);
			remainingPackages.splice(i, 1);
		}

		for(var p of side1Packages) {
			var i = remainingPackages.indexOf(p);
			remainingPackages.splice(i, 1);
		}

		var side2Packages = [];
		var count = 0;
		var sideWeight2 = 0;

		while(sideWeight2 != targetWeight) {
			sideWeight2 = 0;
			side2Packages = [];

			for(var i = 0; i < remainingPackages.length; i++) {
				sideWeight2 += remainingPackages[i];
				side2Packages.push(remainingPackages[i]);
				if(sideWeight2 >= targetWeight) {break; }
			}

			count++

			if(count > remainingPackages.length) {
				//None of the combos add to the total weight
				break;
			}

			remainingPackages = rotate(remainingPackages);
		}


		//Find Trunk Packages

		var trunkPackages = packages.slice(0);

		for(var p of usedPackages) {
			var i = trunkPackages.indexOf(p);
			trunkPackages.splice(i, 1);
		}

		for(var p of side1Packages) {
			var i = trunkPackages.indexOf(p);
			trunkPackages.splice(i, 1);
		}

		for(var p of side2Packages) {
			var i = trunkPackages.indexOf(p);
			trunkPackages.splice(i, 1);
		}

		var count = 0;
		var trunkWeight = 0;

		for(var p of trunkPackages) {
			trunkWeight += p;
		}

		//console.log("Side 2 Weight: " + sideWeight2 + ", " + k);

		if(trunkWeight === targetWeight) { 
			var w = [usedPackages, side1Packages, side2Packages];
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


