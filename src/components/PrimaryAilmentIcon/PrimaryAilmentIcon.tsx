import { BsFire } from 'react-icons/bs';
import { baseSize } from '../../constants/gameData';
import { PrimaryAilment } from '../../interfaces/Ailment';

export const PrimaryAilmentIcon = ({
	primaryAilment,
	size,
}: {
	primaryAilment?: PrimaryAilment;
	size?: number;
}) => {
	if (primaryAilment?.type === 'burn') {
		return <BsFire size={size ?? baseSize / 3} />;
	}
	return <></>;
};
