import { ohkoMoves } from '../constants/groupedMoves';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const getCompoundEyesFactor = (
	p: BattlePokemon,
	attack: BattleAttack
): 1.3 | 1 =>
	p.ability === 'compound-eyes' && !ohkoMoves.includes(attack.name) ? 1.3 : 1;

export const getHustleFactor = (
	p: BattlePokemon,
	attack: BattleAttack
): 0.8 | 1 =>
	p.ability === 'hustle' &&
	!ohkoMoves.includes(attack.name) &&
	attack.data.damage_class.name === 'physical'
		? 0.8
		: 1;
