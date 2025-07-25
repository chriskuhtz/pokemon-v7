import { FiSunrise, FiSunset } from 'react-icons/fi';
import { MdNightlight, MdOutlineWbSunny } from 'react-icons/md';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { getTimeOfDay } from '../../functions/getTimeOfDay';

export const TimeOfDayIcon = () => {
	const time = getTimeOfDay();
	if (time === 'MORNING') {
		return <FiSunrise size={battleSpriteSize} />;
	}
	if (time === 'EVENING') {
		return <FiSunset size={battleSpriteSize} />;
	}
	if (time === 'NIGHT') {
		return <MdNightlight size={battleSpriteSize} />;
	}

	return <MdOutlineWbSunny size={battleSpriteSize} />;
};
