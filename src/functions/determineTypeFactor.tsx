import {
	ballAndBombMoves,
	powderMoves,
	soundBasedMoves,
} from '../constants/groupedMoves';
import { Message } from '../hooks/useMessageQueue';
import { BattleAttack } from '../interfaces/BattleActions';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	PokemonType,
	pokemonTypes,
	typeEffectivenessChart,
} from '../interfaces/PokemonType';
import { StatObject } from '../interfaces/StatObject';
import { WeatherType } from '../interfaces/Weather';
import { BattleTerrain } from '../modules/Battle/hooks/useBattleTerrain';
import { getHeldItem } from './getHeldItem';
import { getTypeNames } from './getTypeNames';
import { hasAilment } from './hasAilment';

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
	weather: WeatherType | undefined,
	terrain: BattleTerrain | undefined,
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
	if (attackType === 'normal' && attacker.ability === 'pixilate') {
		attackType = 'fairy';
	}
	if (attackType === 'normal' && attacker.ability === 'aerilate') {
		attackType = 'flying';
	}
	if (attackType === 'normal' && attacker.ability === 'galvanize') {
		attackType = 'flying';
	}
	if (
		soundBasedMoves.includes(attack.name) &&
		attacker.ability === 'liquid-voice'
	) {
		attackType = 'water';
	}
	if (attack.name === 'hidden-power') {
		attackType = getHiddenPowerType(attacker.intrinsicValues);
	}
	if (attack.name === 'weather-ball') {
		if (weather === 'rain') {
			attackType = 'water';
		}
		if (weather === 'sun') {
			attackType = 'fire';
		}
		if (weather === 'hail') {
			attackType = 'ice';
		}
		if (weather === 'sandstorm') {
			attackType = 'rock';
		}
	}
	if (attack.name === 'terrain-pulse') {
		if (terrain === 'electric') {
			attackType = 'electric';
		}
		if (terrain === 'grassy') {
			attackType = 'grass';
		}
		if (terrain === 'misty') {
			attackType = 'fairy';
		}
		if (terrain === 'psychic') {
			attackType = 'psychic';
		}
	}
	if (attack.name === 'revelation-dance') {
		attackType = getTypeNames(attacker).at(0) ?? 'typeless';
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
		(hasAilment(target, 'foresighted') ||
			attacker.ability === 'scrappy' ||
			attacker.ability === 'minds-eye') &&
		(attackType === 'normal' || attackType == 'fighting')
	) {
		res = 1;
	}
	if (
		targetTypes.includes('dark') &&
		hasAilment(target, 'miracle-eyed') &&
		attackType === 'psychic'
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
				icon: <strong>x0</strong>,
			});
		}
		res = 0;
	}
	if (
		target.ability === 'well-baked-body' &&
		attack.data.type.name === 'fire'
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with well baked body`,
				icon: <strong>x0</strong>,
			});
		}
		res = 0;
	}
	if (
		attack.data.type.name === 'ground' &&
		getHeldItem(target) === 'air-balloon'
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with air-balloon`,
				icon: <strong>x0</strong>,
			});
		}
		res = 0;
	}

	if (target.ability === 'wonder-guard' && res <= 1) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with wonder guard`,
				icon: <strong>x0</strong>,
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
				icon: <strong>x0</strong>,
			});
		}
		return 0;
	}
	if (
		getHeldItem(target) === 'safety-goggles' &&
		powderMoves.includes(attack.name)
	) {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with safety goggles`,
				icon: <strong>x0</strong>,
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
				icon: <strong>x0</strong>,
			});
		}
		return 0;
	}
	if (target.ability === 'sap-sipper' && attack.data.type.name === 'grass') {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with sap sipper`,
				icon: <strong>x0</strong>,
			});
		}
		return 0;
	}
	if (target.ability === 'storm-drain' && attack.data.type.name === 'water') {
		if (addMessage) {
			addMessage({
				message: `${target.data.name} prevents damage with storm drain`,
				icon: <strong>x0</strong>,
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
	if (
		target.secondaryAilments.some((s) => s.type === 'landed') &&
		attack.data.type.name === 'ground' &&
		targetTypes.includes('flying')
	) {
		return 1;
	}
	if (attack.name === 'freeze-dry' && targetTypes.includes('water')) {
		res *= 2;
	}

	if (res === 0) {
		if (addMessage) {
			addMessage({
				message: `It has no effect against ${target.name}`,
				icon: <strong>x{res}</strong>,
			});
		}
		return 0;
	}
	if (res > 1 && addMessage) {
		addMessage({
			message: `It is very effective against ${target.name}`,
			icon: <strong>x{res}</strong>,
		});
	}
	if (res < 1 && addMessage) {
		addMessage({
			message: `It is not very effective against ${target.name}`,
			icon: <strong>x{res}</strong>,
		});
	}
	return res;
};
