import { FaCloudRain } from 'react-icons/fa';
import { WiSandstorm } from 'react-icons/wi';
import { baseSize } from '../../constants/gameData';
import { WeatherType } from '../../functions/determineWeatherFactor';

export const WeatherIcon = ({ weather }: { weather?: WeatherType }) => {
	return (
		<>
			{weather === 'rain' && <FaCloudRain size={baseSize / 2} />}
			{weather === 'sandstorm' && <WiSandstorm size={baseSize / 2} />}
		</>
	);
};
