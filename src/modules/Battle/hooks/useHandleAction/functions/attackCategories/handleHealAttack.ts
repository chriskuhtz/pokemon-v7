import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { getTimeOfDay } from '../../../../../../functions/getTimeOfDay';
import { getTypeNames } from '../../../../../../functions/getTypeNames';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';
import { BattleTerrain } from '../../../useBattleTerrain';

export const handleHealAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
	terrain,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
	terrain: BattleTerrain | undefined;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };

	const move = m;

	addMessage({ message: `${updatedAttacker.name} healed itself` });

	const actualHealing = () => {
		if (move.name === 'morning-sun') {
			if (getTimeOfDay() === 'MORNING') {
				return 66;
			}
			if (
				battleWeather === 'hail' ||
				battleWeather === 'rain' ||
				battleWeather === 'sandstorm'
			) {
				return 25;
			}
		}
		if (move.name === 'moonlight') {
			if (getTimeOfDay() === 'NIGHT') {
				return 66;
			}
			if (
				battleWeather === 'hail' ||
				battleWeather === 'rain' ||
				battleWeather === 'sandstorm'
			) {
				return 25;
			}
		}
		if (move.name === 'synthesis') {
			if (battleWeather === 'sun') {
				return 66;
			}
			if (
				battleWeather === 'hail' ||
				battleWeather === 'rain' ||
				battleWeather === 'sandstorm'
			) {
				return 25;
			}
		}
		if (move.name === 'shore-up') {
			if (battleWeather === 'sandstorm') {
				return 66;
			}
		}
		if (move.name === 'floral-healing') {
			if (terrain === 'grassy') {
				return 66;
			}
		}

		return move.data.meta.healing;
	};
	updatedAttacker = {
		...updatedAttacker,
		damage: getMiddleOfThree([
			0,
			updatedAttacker.damage -
				(updatedAttacker.stats.hp / 100) * actualHealing(),
			updatedAttacker.stats.hp,
		]),
		moveQueue: [],
	};
	if (
		move.name === 'roost' &&
		getTypeNames(updatedAttacker).includes('flying')
	) {
		addMessage({ message: `${updatedAttacker.name} had to land` });

		updatedAttacker = {
			...updatedAttacker,
			secondaryAilments: [
				...updatedAttacker.secondaryAilments,
				{ type: 'landed', duration: 1 },
			],
		};
	}

	return pokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}

		return p;
	});
};
