import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';
import { BattleMessage } from '../modules/Battle/BattleField';

export const applyOnBattleEnterAbility = ({
	user,
	setWeather,
	currentWeather,
	setPokemon,
	addMessage,
}: {
	user: BattlePokemon;
	setWeather: (x: WeatherType) => void;
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>;
	currentWeather: WeatherType | undefined;
	addMessage: (x: BattleMessage) => void;
}) => {
	if (user.ability === 'drizzle' && currentWeather !== 'rain') {
		setWeather('rain');
		addMessage({ message: `${user.data.name} made it rain with drizzle` });
	}
	if (
		currentWeather &&
		(user.ability === 'air-lock' || user.ability === 'cloud-nine')
	) {
		addMessage({
			message: `${user.data.name} negates all weather effects with ${user.ability}`,
		});
	}
	// if (opponent && user.ability === 'intimidate') {
	// 	setOpponent(
	// 		applyStatChangeToPokemon(
	// 			opponent,
	// 			'attack',
	// 			-1,
	// 			dispatchToast,
	// 			'intimidate'
	// 		)
	// 	);
	// }

	setPokemon((pokemon) =>
		pokemon.map((p) => {
			if (p.id === user.id) {
				return { ...p, roundsInBattle: p.roundsInBattle + 1 };
			}
			return p;
		})
	);
};
