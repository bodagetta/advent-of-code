function player() {
	return {
		mana: 500,
		hp: 50,
		armor: 0,
		effects: [],
		spells: [],
		manaSpent: 0
	}
}

function boss() {
	return {
		hp: 71,
		damage: 10,
		effects: []
	}
}

var spells = [
	{name: "Magic Missile", cost: 53, damage: 4, heal: 0, effect: {name: "M", time: 0, armor: 0, damage: 0, mana: 0}},
	{name: "Drain", cost: 73, damage: 2, heal: 2, effect: {name: "D", time: 0, armor: 0, damage: 0, mana: 0}},
	{name: "Shield", cost: 113, damage: 0, heal: 0, effect: {name: "S", time: 6, armor: 7, damage: 0, mana: 0}},
	{name: "Poison", cost: 173, damage: 0, heal: 0, effect: {name: "P", time: 6, armor: 0, damage: 3, mana: 0}},
	{name: "Recharge", cost: 229, damage: 0, heal: 0, effect: {name: "R", time: 5, armor: 0, damage: 0, mana: 101}},
];

function applyEffect(a, d, e) {

	if(e.time > 0) {
		d.hp -= e.damage;
		a.armor += e.armor;
		a.mana += e.mana;
		e.time -= 1;
	}
	return e;
}

function addEffect(a, e) {
	for(effect of a.effects) {
		//If effect is already active 
		if(effect.name === e.name) {
			if(effect.time > 0) {
				return false;
			}
		}
	}

	var eObject = JSON.parse(JSON.stringify(e));
	a.effects.push(eObject);
	return true;
}

function takeRound(attacker, defender, spell) {

	//Apply Effect from Attacker
	for(effect of attacker.effects) {
		effect = applyEffect(attacker, defender, effect);
	}

	//Apply Effect from Defender
	for(effect of defender.effects) {
		effect = applyEffect(defender, attacker, effect);
	}

	if(attacker.hp <= 0 || defender.hp <= 0) {
		return true;
	}

	//The attacker is a player
	if(spell) {
		//Apply Cost
		if(spell.cost > attacker.mana) {
			//Not enough mana to cast
			return false;
		}

		attacker.manaSpent += spell.cost;
		attacker.mana -= spell.cost;
		attacker.spells.push(spell);
		defender.hp -= spell.damage;
		attacker.hp += spell.heal;


		if(!addEffect(attacker, spell.effect)) {
			//Can't add the effect, it already exists
			return false;
		}

	}

	//The attacker is a boss
	else {
		var damage = attacker.damage - defender.armor;
		if(damage <= 0) {
			damage = 1;
		}
		defender.hp -= damage;
	}

	return true;

}

function checkWinner(p,b) {
	if(p.hp <= 0) {
		return false;
	}
	if(b.hp <= 0) {
		return true;
	}
	return null;
}

function runSpell(p,b,spell) {
	if(!takeRound(p, b, spell)) {
		//Jump to next value, this spell was invalid
		return true;
	}

	if(checkWinner(p,b) === true) {
		//Add to Winner's Bracket, jump to next spell combo
		winners.push(p);
		return true;
	}
	if(checkWinner(p,b) === false) {
		losers.push(p);
		return true;
	}

	//Boss attacks
	if(!takeRound(b,p)) {				
		return true;
	}

	if(checkWinner(p,b) === true) {
		//Add to Winner's Bracket, jump to next spell combo
		winners.push(p);
		return true;
	}
	if(checkWinner(p,b) === false) {
		losers.push(p);
		return true;
	}
	return false;
}

var winners = [];
var losers = [];
var undecided = [];

// var p = new player();
// var b = new boss();

// if(runSpell(p,b,spells[3])) {
// 	console.log('1');
// }

// if(runSpell(p,b,spells[0])) {
// 	console.log('2');
// }

// console.log(winners);

// for (var i = 0; i < spells.length; i++) {
// 	for (var j = 0; j < spells.length; j++) {
// 		console.log(i + ", " + j);
// 		var p = new player();
//  		var b = new boss();
// 		if(runSpell(p,b,spells[i])) {
// 			continue;
// 		}

// 		if(runSpell(p,b,spells[j])) {
// 			continue;
// 		}
		
// 		console.log(i + ", " + j);
// 	}
// }


// for (var i = 0; i < spells.length; i++) {
// 	for (var j = 0; j < spells.length; j++) {
// 		for (var k = 0; k < spells.length; k++) {
// 			for (var l = 0; l < spells.length; l++) {
// 				for (var m = 0; m < spells.length; m++) {
// 					var p = new player();
// 					var b = new boss();

// 					if(runSpell(p,b,spells[i])) {
// 						continue;
// 					}

// 					if(runSpell(p,b,spells[j])) {
// 						continue;
// 					}

// 					if(runSpell(p,b,spells[k])) {
// 						continue;
// 					}

// 					if(runSpell(p,b,spells[l])) {
// 						continue;
// 					}

// 					if(runSpell(p,b,spells[m])) {
// 						continue;
// 					}

// 					console.log('no outcome');
// 					console.log(p);
					
					
// 				}
// 			}
// 		}
// 	}
// }

for(var i = 0; i < spells.length; i++) {

	var p = new player();
	var b = new boss();

	if(!runSpell(p,b,spells[i])) {
		//Spell player and boss don't have an outcome add them to the undecided array
		undecided.push({player: p, boss: b});
	}

}

var count = 0;

while(undecided.length > 0) {


	for(var i = 0; i < undecided.length; i++) {

		var start = undecided.length;

		for(var j = 0; j < spells.length; j++) {
			count++;

			var clonedPlayer = JSON.parse(JSON.stringify(undecided[i].player));
			var clonedBoss = JSON.parse(JSON.stringify(undecided[i].boss));

			var p = clonedPlayer;
			var b = clonedBoss;

			if(!runSpell(p,b,spells[j])) {
				//Spell player and boss don't have an outcome add them to the undecided array
				undecided.push({player: p, boss: b}); 
			}

			if(count > 400000) {
				winners.sort(function(a,b){
					return a.manaSpent - b.manaSpent;
				});

				console.log(winners.length);
				console.log(losers.length);
				console.log(undecided.length);
				console.log(winners[0]);
				console.log("early abort");
				process.exit(0);
			}
		}
		//console.log(undecided.length - start);

		//Exhausted all possibilities of next spell for this element, remove it
		undecided.splice(i,1);
	}

}

winners.sort(function(a,b){
	return a.manaSpent - b.manaSpent;
});

console.log(winners.length);
console.log(losers.length);
console.log(undecided.length);
console.log(winners[0]);
// console.log(losers[0].spells);

