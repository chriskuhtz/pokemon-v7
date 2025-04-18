import { ballAndBombMoves } from '../constants/punchBasedMoves';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	PokemonType,
	pokemonTypes,
	typeEffectivenessChart,
} from '../interfaces/PokemonType';
import { StatObject } from '../interfaces/StatObject';
import { getHeldItem } from './getHeldItem';
import { getTypeNames } from './getTypeNames';

const getHiddenPowerType = (ivs: StatObject): PokemonType => {
	const a = ivs.hp % 2;
	const b = ivs.defense % 2;
	const c = ivs.attack % 2;
	const d = ivs.speed % 2;
	const e = ivs['special-attack'] % 2;
	const f = ivs['special-defense'] % 2;

	const factor = (a + 2 * b + 4 * c + 8 * d + 16 * e + 32 * f) * 15;

	return pokemonTypes[Math.floor(factor / 63)];
};
export const determineTypeFactor = (
	target: BattlePokemon,
	attacker: BattlePokemon,
	attack: BattleAttack,

	addMessage?: (x: Message) => void
): number => {
	let res = 1;
	const normalized = attacker.ability === 'normalize';
	const targetTypes = getTypeNames(target);

	let attackType = attack.data.type.name;
	if (normalized) {
		attackType = 'normal';
	}
	if (attackType === 'normal' && attacker.ability === 'refrigerate') {
		attackType = 'ice';
	}
	if (attack.name === 'hidden-power') {
		attackType = getHiddenPowerType(attacker.intrinsicValues);
	}

	const effectiveness = typeEffectivenessChart[attackType];

	targetTypes.forEach((t) => {
		if (effectiveness.isNotVeryEffectiveAgainst.includes(t)) {
			res /= 2;
		} else if (effectiveness.isSuperEffectiveAgainst.includes(t)) {
			res *= 2;
		} else if (effectiveness.doesntEffect.includes(t)) {
			res = 0;
		}
	});

	if (
		targetTypes.includes('ghost') &&
		(target.secondaryAilments.some((s) => s.type === 'foresighted') ||
			attacker.ability === 'scrappy') &&
		(attackType === 'normal' || attackType == 'fighting')
	) {
		res = 1;
	}
	if (
		target.ability === 'levitate' &&
		attack.data.type.name === 'ground' &&
		getHeldItem(target) !== 'iron-ball'
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with levitate`,
			});
		}
		res = 0;
	}

	if (target.ability === 'wonder-guard' && res <= 1) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with wonder guard`,
			});
		}
		return 0;
	}
	if (
		target.ability === 'bulletproof' &&
		ballAndBombMoves.includes(attack.name)
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with bulletproof`,
			});
		}
		return 0;
	}

	if (
		target.ability === 'lightning-rod' &&
		attack.data.type.name === 'electric'
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with lightning rod`,
			});
		}
		return 0;
	}
	if (target.ability === 'sap-sipper' && attack.data.type.name === 'grass') {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with sap sipper`,
			});
		}
		return 0;
	}
	if (target.ability === 'storm-drain' && attack.data.type.name === 'water') {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with storm drain`,
			});
		}
		return 0;
	}
	if (
		getHeldItem(target) === 'iron-ball' &&
		attack.data.type.name === 'ground' &&
		targetTypes.includes('flying')
	) {
		return 1;
	}

	if (res === 0) {
		if (addMessage) {
			addMessage({ message: 'It has no effect' });
		}
		return 0;
	}
	if (res > 1 && addMessage) {
		addMessage({ message: 'It is very effective' });
	}
	if (res < 1 && addMessage) {
		addMessage({ message: 'It is not very effective' });
	}
	return res;
};
