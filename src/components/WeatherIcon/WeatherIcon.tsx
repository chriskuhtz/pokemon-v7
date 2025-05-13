import { useContext } from 'react';
import { BsThermometerSun } from 'react-icons/bs';
import { FaCloudRain } from 'react-icons/fa';
import { RiHailLine } from 'react-icons/ri';
import { WiSandstorm } from 'react-icons/wi';
import { battleSpriteSize } from '../../constants/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { PokemonType } from '../../interfaces/PokemonType';
import { WeatherType } from '../../interfaces/Weather';
import { BattleTerrain } from '../../modules/Battle/hooks/useBattleTerrain';

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

const terrainTypeMap: Record<BattleTerrain, PokemonType> = {
	grassy: 'grass',
	electric: 'electric',
	psychic: 'psychic',
};
const terrainExplanations: Record<BattleTerrain, string> = {
	grassy:
		'Grass Moves are boosted 30%, all fighters are healed 1/16th every turn',
	electric: 'Electric Moves are boosted 30%, sleep attacks dont work',
	psychic: 'Psychic Moves are boosted 30%, priority attacks dont work',
};

export const TerrainIcon = ({ terrain }: { terrain?: BattleTerrain }) => {
	const { addMessage } = useContext(MessageQueueContext);
	if (!terrain) {
		return <></>;
	}
	return (
		<img
			onClick={() => addMessage({ message: terrainExplanations[terrain] })}
			src={`/typeIcons/${terrainTypeMap[terrain]}.png`}
			height={battleSpriteSize / 2}
		/>
	);
};
