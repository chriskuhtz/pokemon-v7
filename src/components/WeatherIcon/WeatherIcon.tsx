import { BsThermometerSun } from 'react-icons/bs';
import { FaCloudRain } from 'react-icons/fa';
import { RiHailLine } from 'react-icons/ri';
import { WiSandstorm } from 'react-icons/wi';
import { battleSpriteSize } from '../../constants/gameData';
import { WeatherType } from '../../interfaces/Weather';

export const WeatherIcon = ({ weather }: { weather?: WeatherType }) => {
	return (
		<>
			{(weather === 'rain' || weather === 'rain_effectless') && (
				<FaCloudRain size={battleSpriteSize} />
			)}
			{(weather === 'sandstorm' || weather === 'sandstorm_effectless') && (
				<WiSandstorm size={battleSpriteSize} />
			)}
			{(weather === 'hail' || weather === 'hail_effectless') && (
				<RiHailLine size={battleSpriteSize} />
			)}
			{(weather === 'sun' || weather === 'sun_effectless') && (
				<BsThermometerSun size={battleSpriteSize} />
			)}
		</>
	);
};
