var targetGifts = 36000000;
//var targetGifts = 100;

var houses = []; //Houses (index) and gifts (value) for part one
var houses2 = []; //Houses (index) and gifts (value) for part two
var count = []; //Number of gifts delivered by each elf

function printPartOne() {
	for(var index in houses) {
		var house = houses[index];
		if(house >= targetGifts) {
			console.log("Part One: " + index);
			return null;
		}
	}
}

function printPartTwo() {
	for(var index in houses2) {
		var house = houses2[index];
		if(house >= targetGifts) {
			console.log("Part Two: " + index);
			return null;
		}
	}
}

for(var i = 1; i <= targetGifts / 10; i++) { // Elves
	for(var j = i; j <= targetGifts / 10; j = j + i) { // Houses

		if(!count[i]) { count[i] = 0 }

		if(!houses[j]) {
			houses[j] = 10;
			houses2[j] = 11;
		}

		else {
			houses[j] += i * 10;
		}

		if(count[i] < 50) {
			houses2[j] += i * 11;
		}

		count[i] += 1;
		

	}
}

printPartOne();
printPartTwo();