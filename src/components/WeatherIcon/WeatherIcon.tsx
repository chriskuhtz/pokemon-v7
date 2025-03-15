import { FaCloudRain } from 'react-icons/fa';
import { WiSandstorm } from 'react-icons/wi';
import { WeatherType } from '../../interfaces/Weather';
import { battleSpriteSize } from '../../constants/gameData';

export const WeatherIcon = ({ weather }: { weather?: WeatherType }) => {
	return (
		<>
			{weather === 'rain' ||
				(weather === 'rain_effectless' && (
					<FaCloudRain size={battleSpriteSize} />
				))}
			{weather === 'sandstorm' ||
				(weather === 'sandstorm_effectless' && (
					<WiSandstorm size={battleSpriteSize} />
				))}
		</>
	);
};
