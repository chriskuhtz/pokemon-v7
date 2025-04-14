import { useCallback, useMemo, useState } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../interfaces/Weather';

export interface WeatherObject {
	type: WeatherType;
	duration: number;
}
export const useBattleWeather = (allOnField: BattlePokemon[]) => {
	const [bW, setBattleWeather] = useState<WeatherObject | undefined>();

	const battleWeather: WeatherType | undefined = useMemo(() => {
		if (
			bW?.type &&
			allOnField.some(
				(p) => p.ability === 'air-lock' || p.ability === 'cloud-nine'
			)
		) {
			return `${bW}_effectless` as WeatherType;
		}
		return bW?.type;
	}, [allOnField, bW]);

	const reduceWeatherDuration = useCallback(() => {
		if (!bW) {
			return;
		}
		if (bW.duration === 1) {
			setBattleWeather(undefined);
		}
		if (bW.duration > 1) {
			setBattleWeather({ ...bW, duration: bW.duration - 1 });
		}
	}, [bW]);
	return {
		battleWeather,
		setBattleWeather,
		reduceWeatherDuration,
	};
};
