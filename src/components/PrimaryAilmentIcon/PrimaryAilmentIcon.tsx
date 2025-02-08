import { BsFire } from 'react-icons/bs';
import { baseSize } from '../../constants/gameData';
import { typeColors } from '../../constants/typeColors';
import { PrimaryAilment } from '../../interfaces/Ailment';

export const PrimaryAilmentIcon = ({
	primaryAilment,
	size,
}: {
	primaryAilment?: PrimaryAilment;
	size?: number;
}) => {
	if (primaryAilment?.type === 'burn') {
		return <BsFire color={typeColors['fire']} size={size ?? baseSize / 3} />;
	}
	return <></>;
};
