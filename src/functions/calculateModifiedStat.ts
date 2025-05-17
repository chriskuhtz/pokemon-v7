import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { getHeldItem } from './getHeldItem';

export const calculateModifiedStat = (
	statName: Stat,
	pokemon: BattlePokemon,
	flowerGiftActive: boolean,
	ignoreModifier?: boolean
): number => {
	const unmodified = pokemon.stats[statName];
	const modifier = ignoreModifier ? 0 : pokemon.statBoosts[statName];
	const heldItem = getHeldItem(pokemon);
	let res = unmodified;
	if (modifier > 0) {
		res = unmodified + modifier * unmodified * 0.5;
	}
	if (modifier < 0) {
		res = unmodified + modifier * unmodified * 0.125;
	}

	if (
		heldItem === 'light-ball' &&
		pokemon.name.includes('pikachu') &&
		statName === 'special-attack'
	) {
		res = res * 2;
	}
	if (
		heldItem === 'thick-club' &&
		(pokemon.name.includes('marowak') || pokemon.name === 'cubone') &&
		statName === 'attack'
	) {
		res = res * 2;
	}
	if (
		heldItem === 'metal-powder' &&
		pokemon.name.includes('ditto') &&
		(statName === 'defense' || statName === 'special-defense')
	) {
		res = res * 1.5;
	}
	if (
		heldItem === 'quick-powder' &&
		pokemon.name.includes('ditto') &&
		statName === 'speed'
	) {
		res = res * 2;
	}
	if (
		heldItem === 'soul-dew' &&
		(pokemon.name === 'latias' ||
			pokemon.name === 'latios' ||
			pokemon.name === 'latios-mega' ||
			pokemon.name === 'latias-mega') &&
		(statName === 'special-attack' || statName === 'special-defense')
	) {
		res = res * 1.5;
	}
	if (
		heldItem === 'deep-sea-scale' &&
		pokemon.name === 'clamperl' &&
		statName === 'special-defense'
	) {
		res = res * 1.5;
	}
	if (
		heldItem === 'deep-sea-tooth' &&
		pokemon.name === 'clamperl' &&
		statName === 'special-attack'
	) {
		res = res * 1.5;
	}
	if (
		flowerGiftActive &&
		(statName === 'attack' || statName === 'special-defense')
	) {
		res = res * 1.5;
	}
	if (
		pokemon.ability === 'slow-start' &&
		pokemon.roundsInBattle < 5 &&
		(statName === 'attack' || statName === 'speed')
	) {
		res /= 2;
	}

	return res;
};
