import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';

export const applyOnBattleEnterAbility = ({
	pokemon,
	setWeather,
	dispatchToast,
}: {
	pokemon: BattlePokemon;
	setWeather: (x: WeatherType) => void;
	dispatchToast: AddToastFunction;
}) => {
	if (pokemon.ability === 'drizzle') {
		setWeather('rain');
		dispatchToast(`${pokemon.data.name} made it rain with drizzle`);
	}
};
