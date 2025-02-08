import { FaCloudRain } from 'react-icons/fa';
import { baseSize } from '../../../constants/gameData';
import { BattleStep } from '../types/BattleStep';
import { WeatherType } from '../../../functions/determineWeatherFactor';

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
				Weather: {battleWeather}{' '}
				{battleWeather === 'rain' && <FaCloudRain size={baseSize / 2} />}
			</strong>
		</div>
	);
};
