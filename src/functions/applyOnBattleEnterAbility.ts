import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from './calculateDamage';

export const applyOnBattleEnterAbility = ({
	pokemon,
	setWeather,
	dispatchToast,
}: {
	pokemon: BattlePokemon;
	setWeather: (x: WeatherType) => void;
	dispatchToast: (x: string) => void;
}) => {
	if (pokemon.ability === 'drizzle') {
		setWeather('rain');
		dispatchToast(`${pokemon.data.name} made it rain with drizzle`);
	}
};
