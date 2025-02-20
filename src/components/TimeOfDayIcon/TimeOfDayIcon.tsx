import { FiSunrise, FiSunset } from 'react-icons/fi';
import { MdNightlight, MdOutlineWbSunny } from 'react-icons/md';
import { baseSize } from '../../constants/gameData';
import { getTimeOfDay } from '../../functions/getTimeOfDay';

export const TimeOfDayIcon = () => {
	const time = getTimeOfDay();
	if (time === 'MORNING') {
		return <FiSunrise size={baseSize / 2} />;
	}
	if (time === 'EVENING') {
		return <FiSunset size={baseSize / 2} />;
	}
	if (time === 'NIGHT') {
		return <MdNightlight size={baseSize / 2} />;
	}

	return <MdOutlineWbSunny size={baseSize / 2} />;
};
