function boss() {
	return {
		hp: 104,
		damage: 8,
		armor: 1
	}
}

function player() {

	return {
		hp: 100,
		damage: 0,
		armor: 0,
		goldCost: 0,
		equipped: []
	}

};

var weapons = [
	{name: 'Dagger', cost: 8, damage: 4, armor: 0},
	{name: 'Shortsword', cost: 10, damage: 5, armor: 0},
	{name: 'Warhammer', cost: 25, damage: 6, armor: 0},
	{name: 'Longsword', cost: 40, damage: 7, armor: 0},
	{name: 'Greataxe', cost: 74, damage: 8, armor: 0}
];

var armor = [
	{name: 'No Armor', cost: 0, damage: 0, armor: 0},
	{name: 'Leather', cost: 13, damage: 0, armor: 1},
	{name: 'Chainmail', cost: 31, damage: 0, armor: 2},
	{name: 'Splintmail', cost: 53, damage: 0, armor: 3},
	{name: 'Bandedmail', cost: 75, damage: 0, armor: 4},
	{name: 'Platemail', cost: 102, damage: 0, armor: 5}
];

var rings = [
	{name: 'No Ring 1', cost: 0, damage: 0, armor: 0},
	{name: 'No Ring 2', cost: 0, damage: 0, armor: 0},
	{name: 'Damage +1', cost: 25, damage: 1, armor: 0},
	{name: 'Damage +2', cost: 50, damage: 2, armor: 0},
	{name: 'Damage +3', cost: 100, damage: 3, armor: 0},
	{name: 'Defense +1', cost: 20, damage: 0, armor: 1},
	{name: 'Defense +2', cost: 40, damage: 0, armor: 2},
	{name: 'Defense +3', cost: 80, damage: 0, armor: 3}
];

function calculateDamage(attacker, defender) {
	var damage = attacker.damage - defender.armor;

	if(damage <= 0) {
		damage = 1;
	}

	return damage;
}

function equip(p, o) {

	p.goldCost += o.cost;
	p.damage += o.damage;
	p.armor += o.armor;
	p.equipped.push(o.name);

	return p;

}

function wouldWin(attacker) {

	var defender = new boss();

	while(true) {
		defender.hp -= calculateDamage(attacker, defender);
		if(defender.hp <= 0) {
			return true;
		}
		attacker.hp -= calculateDamage(defender, attacker);
		if(attacker.hp <= 0) {
			return false;
		}
	}
}

var winners = [];
var losers = [];

for (var i = 0; i < weapons.length; i++) {
	for (var j = 0; j < armor.length; j++) {
		for (var k = 0; k < rings.length; k++) {
			for (var l = 0; l < rings.length; l++) {
				var p = new player();
				p = equip(p, weapons[i]);
				p = equip(p, armor[j]);
				p = equip(p, rings[k]);
				if (k != l) {
					p = equip(p, rings[l]);
				}
				if (wouldWin(p)) {
					winners.push(p);
				}
				else {
					losers.push(p);
				}
			}
		}
	}
}

winners.sort(function(a,b) {
	return a.goldCost - b.goldCost;
});

losers.sort(function(a,b) {
	return b.goldCost - a.goldCost;
});

console.log("Part One | Least Amount of Gold to Win: " + winners[0].goldCost);
console.log("Part Two | Most Amount of Gold to Lose: " + losers[0].goldCost);
console.log(winners[0]);
console.log(losers[0]);






