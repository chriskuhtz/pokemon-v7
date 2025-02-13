import { AddToastFunction } from '../hooks/useToasts';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { WeatherType } from '../interfaces/Weather';

export const applyOnBattleEnterAbility = ({
	pokemon,
	setWeather,
	currentWeather,
	dispatchToast,
}: {
	pokemon: BattlePokemon;
	setWeather: (x: WeatherType) => void;
	currentWeather: WeatherType | undefined;
	dispatchToast: AddToastFunction;
}) => {
	if (pokemon.ability === 'drizzle') {
		setWeather('rain');
		dispatchToast(`${pokemon.data.name} made it rain with drizzle`);
	}
	if (
		(currentWeather && pokemon.ability === 'air-lock') ||
		pokemon.ability === 'cloud-nine'
	) {
		dispatchToast(
			`${pokemon.data.name} negates all weather effects with ${pokemon.ability}`
		);
	}
};
