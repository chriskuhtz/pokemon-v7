import { useCallback, useContext, useMemo, useState } from 'react';
import { MessageQueueContext } from '../../../hooks/useMessageQueue';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { WeatherType } from '../../../interfaces/Weather';

const getWeatherMessage = (weather: WeatherType) => {
	if (weather == 'sun') {
		return 'sun is burning down';
	}
	if (weather == 'hail') {
		return 'hail is pelting down';
	}
	if (weather == 'sandstorm') {
		return 'the sandstorm is howling';
	}
	return 'rain is pouring down';
};
export interface WeatherObject {
	type: WeatherType;
	duration: number;
}
export const useBattleWeather = (allOnField: BattlePokemon[]) => {
	const [bW, setBattleWeather] = useState<WeatherObject | undefined>();
	const { addMessage } = useContext(MessageQueueContext);

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
			addMessage({ message: `the ${bW.type} stopped` });
			setBattleWeather(undefined);
		}
		if (bW.duration > 1) {
			addMessage({ message: getWeatherMessage(bW.type) });
			setBattleWeather({ ...bW, duration: bW.duration - 1 });
		}
	}, [addMessage, bW]);
	return {
		battleWeather,
		setBattleWeather,
		reduceWeatherDuration,
	};
};

export type BattleTerrain = 'grassy';
export interface TerrainObject {
	type: BattleTerrain;
	duration: number;
}
export const useBattleTerrain = () => {
	const [bT, setBattleTerrain] = useState<TerrainObject | undefined>();

	const battleTerrain: BattleTerrain | undefined = useMemo(() => {
		return bT?.type;
	}, [bT?.type]);

	const reduceWeatherDuration = useCallback(() => {
		if (!bT) {
			return;
		}
		if (bT.duration === 1) {
			setBattleTerrain(undefined);
		}
		if (bT.duration > 1) {
			setBattleTerrain({ ...bT, duration: bT.duration - 1 });
		}
	}, [bT]);
	return {
		battleTerrain,
		setBattleTerrain,
		reduceWeatherDuration,
	};
};
