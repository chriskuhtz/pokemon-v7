import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { getHeldItem } from '../../../../../../functions/getHeldItem';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { WeatherObject } from '../../../useBattleWeather';

export const handleWholeFieldEffectAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	setBattleWeather,
	target,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	setBattleWeather: (x: WeatherObject) => void;
	target: BattlePokemon;
}): BattlePokemon[] => {
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

	const updatedAttacker = { ...attacker };
	const updatedTarget = { ...target };
	const move = m;

	if (move.name === 'sunny-day') {
		setBattleWeather({ type: 'sun', duration: 5 });
	}
	if (move.name === 'hail') {
		setBattleWeather({
			type: 'hail',
			duration: getHeldItem(attacker) === 'icy-rock' ? 8 : 5,
		});
	}
	if (move.name === 'sandstorm') {
		setBattleWeather({ type: 'sandstorm', duration: 5 });
	}
	if (move.name === 'rain-dance') {
		setBattleWeather({ type: 'rain', duration: 5 });
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
