import { FaCloudRain } from 'react-icons/fa';
import { WiSandstorm } from 'react-icons/wi';
import { baseSize } from '../../constants/gameData';
import { WeatherType } from '../../interfaces/Weather';

export const WeatherIcon = ({ weather }: { weather?: WeatherType }) => {
	return (
		<>
			{weather === 'rain' ||
				(weather === 'rain_effectless' && <FaCloudRain size={baseSize / 2} />)}
			{weather === 'sandstorm' ||
				(weather === 'sandstorm_effectless' && (
					<WiSandstorm size={baseSize / 2} />
				))}
		</>
	);
};
