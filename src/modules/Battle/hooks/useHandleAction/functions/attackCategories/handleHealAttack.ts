import { getMiddleOfThree } from '../../../../../../functions/getMiddleOfThree';
import { Message } from '../../../../../../hooks/useMessageQueue';
import { BattleAttack } from '../../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../../../../interfaces/Weather';

export const handleHealAttack = ({
	attacker,
	pokemon,
	addMessage,
	move: m,
	battleWeather,
}: {
	attacker: BattlePokemon;
	pokemon: BattlePokemon[];
	addMessage: (x: Message) => void;
	move: BattleAttack;
	battleWeather: WeatherType | undefined;
}): BattlePokemon[] => {
	let updatedAttacker = { ...attacker };

	const move = m;

	addMessage({ message: `${updatedAttacker.name} healed itself` });

	const actualHealing = () => {
		if (move.name === 'morning-sun' && battleWeather === 'sun') {
			return 66;
		}
		if (
			move.name === 'morning-sun' &&
			(battleWeather === 'hail' ||
				battleWeather === 'rain' ||
				battleWeather === 'sandstorm')
		) {
			return 25;
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

	return pokemon.map((p) => {
		if (p.id === updatedAttacker.id) {
			return updatedAttacker;
		}

		return p;
	});
};
