import { ohkoMoves } from '../constants/ohkoMoves';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const getCompoundEyesFactor = (
	p: BattlePokemon,
	attack: BattleAttack
): 1.3 | 1 =>
	p.ability === 'compound-eyes' && !ohkoMoves.includes(attack.name) ? 1.3 : 1;
