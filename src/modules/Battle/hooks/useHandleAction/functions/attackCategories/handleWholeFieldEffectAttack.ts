import { changeMovePP } from '../../../../../../functions/changeMovePP';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { EmptyStatObject } from '../../../../../../interfaces/StatObject';
import { WeatherType } from '../../../../../../interfaces/Weather';

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
	setBattleWeather: (x: WeatherType) => void;
	target: BattlePokemon;
}): BattlePokemon[] => {
	let updatedPokemon: BattlePokemon[] = [...pokemon];
	const setPokemon = (input: BattlePokemon[]) => (updatedPokemon = input);

	const updatedAttacker = { ...attacker };
	const updatedTarget = { ...target };
	const move = m;

	if (move.name === 'sunny-day') {
		setBattleWeather('sun');
	}
	if (move.name === 'hail') {
		setBattleWeather('hail');
	}
	if (move.name === 'sandstorm') {
		setBattleWeather('sandstorm');
	}
	if (move.name === 'rain-dance') {
		setBattleWeather('rain');
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
