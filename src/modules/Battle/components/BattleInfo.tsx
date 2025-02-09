import { WeatherIcon } from '../../../components/WeatherIcon/WeatherIcon';
import { WeatherType } from '../../../interfaces/Weather';
import { BattleStep } from '../types/BattleStep';

export const BattleInfo = ({
	battleStep,
	battleWeather,
	battleRound,
}: {
	battleStep: BattleStep;
	battleWeather?: WeatherType;
	battleRound: number;
}) => {
	return (
		<div style={{ position: 'absolute' }}>
			<strong>BattleStep: {battleStep}</strong>
			<br></br>
			<strong>
				Weather: {battleWeather} <WeatherIcon weather={battleWeather} />
			</strong>
			<br></br>
			<strong>Round: {battleRound}</strong>
		</div>
	);
};
