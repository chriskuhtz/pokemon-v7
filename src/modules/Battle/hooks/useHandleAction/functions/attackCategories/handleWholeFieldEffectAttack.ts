import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { BattleTerrain, TerrainObject } from '../../../useBattleTerrain';
import { WeatherObject } from '../../../useBattleWeather';

export const handleWholeFieldEffectAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	setBattleWeather,
	target,
	setBattleTerrain,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	setBattleWeather: (x: WeatherObject) => void;
	target: BattlePokemon;
	battleTerrain?: BattleTerrain;
	setBattleTerrain: (x: TerrainObject) => void;
}): BattlePokemon[] => {
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

	const updatedAttacker = { ...attacker };
	const updatedTarget = { ...target };
	const move = m;

	if (move.name === 'sunny-day') {
		setBattleWeather({
			type: 'sun',
			duration: getHeldItem(attacker) === 'heat-rock' ? 8 : 5,
		});
	}
	if (move.name === 'hail') {
		setBattleWeather({
			type: 'hail',
			duration: getHeldItem(attacker) === 'icy-rock' ? 8 : 5,
		});
	}
	if (move.name === 'sandstorm') {
		setBattleWeather({
			type: 'sandstorm',
			duration: getHeldItem(attacker) === 'smooth-rock' ? 8 : 5,
		});
	}
	if (move.name === 'rain-dance') {
		setBattleWeather({
			type: 'rain',
			duration: getHeldItem(attacker) === 'damp-rock' ? 8 : 5,
		});
	}
	if (move.name === 'haze') {
		addMessage({
			message: `${attacker.name} removed all stat changes with haze`,
		});
		setPokemon(
			updatedPokemon.map((p) => {
				if (p.id === updatedAttacker.id) {
					return {
						...changeMovePP(updatedAttacker, move.name, -1),
						moveQueue: [],
						statBoosts: EmptyStatObject,
					};
				}

				return { ...p, statBoosts: EmptyStatObject };
			})
		);
		return updatedPokemon;
	}

	const terrainDuration = getHeldItem(attacker) === 'terrain-extender' ? 8 : 5;
	if (move.name === 'grassy-terrain') {
		addMessage({ message: `${attacker.name} spreads grassy terrain` });
		setBattleTerrain({ type: 'grassy', duration: terrainDuration });
	}
	if (move.name === 'misty-terrain') {
		addMessage({ message: `${attacker.name} spreads misty terrain` });
		setBattleTerrain({ type: 'misty', duration: terrainDuration });
	}

	//updated Target

	return updatedPokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}
		if (p.id === updatedTarget.id) {
			return updatedTarget;
		}
		return p;
	});
};
