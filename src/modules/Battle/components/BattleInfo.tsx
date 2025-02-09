import { WeatherIcon } from '../../../components/WeatherIcon/WeatherIcon';
import { WeatherType } from '../../../interfaces/Weather';
import { BattleStep } from '../types/BattleStep';

export const BattleInfo = ({
	battleStep,
	battleWeather,
}: {
	battleStep: BattleStep;
	battleWeather?: WeatherType;
}) => {
	return (
		<div style={{ position: 'absolute' }}>
			<strong>BattleStep: {battleStep}</strong>
			<br></br>
			<strong>
				Weather: {battleWeather} <WeatherIcon weather={battleWeather} />
			</strong>
		</div>
	);
};
