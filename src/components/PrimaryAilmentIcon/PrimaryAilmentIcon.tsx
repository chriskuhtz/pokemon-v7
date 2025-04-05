import { BsFire } from 'react-icons/bs';
import { FaRegSnowflake } from 'react-icons/fa';
import { FaBoltLightning } from 'react-icons/fa6';
import { GiNightSleep, GiPoisonBottle } from 'react-icons/gi';
import { battleSpriteSize } from '../../constants/gameData';
import { PrimaryAilment } from '../../interfaces/Ailment';

export const PrimaryAilmentIcon = ({
	primaryAilment,
	size,
}: {
	primaryAilment?: PrimaryAilment;
	size?: number;
}) => {
	if (primaryAilment?.type === 'burn') {
		return <BsFire size={size ?? battleSpriteSize / 2} />;
	}
	if (primaryAilment?.type === 'freeze') {
		return <FaRegSnowflake size={size ?? battleSpriteSize / 2} />;
	}
	if (primaryAilment?.type === 'paralysis') {
		return <FaBoltLightning size={size ?? battleSpriteSize / 2} />;
	}
	if (primaryAilment?.type === 'poison' || primaryAilment?.type === 'toxic') {
		return <GiPoisonBottle size={size ?? battleSpriteSize / 2} />;
	}
	if (primaryAilment?.type === 'sleep') {
		return <GiNightSleep size={size ?? battleSpriteSize / 2} />;
	}

	return <></>;
};
