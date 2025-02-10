import { FiSunrise, FiSunset } from 'react-icons/fi';
import { MdNightlight, MdOutlineWbSunny } from 'react-icons/md';
import { baseSize } from '../../constants/gameData';
import { isMorning, isEvening, isNight } from '../../functions/getTimeOfDay';

export const TimeOfDayIcon = () => {
	if (isMorning()) {
		return <FiSunrise size={baseSize / 2} />;
	}
	if (isEvening()) {
		return <FiSunset size={baseSize / 2} />;
	}
	if (isNight()) {
		return <MdNightlight size={baseSize / 2} />;
	}

	return <MdOutlineWbSunny size={baseSize / 2} />;
};
