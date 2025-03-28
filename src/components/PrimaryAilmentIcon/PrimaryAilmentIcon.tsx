import { BsFire } from 'react-icons/bs';
import { FaRegSnowflake } from 'react-icons/fa';
import { FaBoltLightning } from 'react-icons/fa6';
import { GiNightSleep, GiPoisonBottle } from 'react-icons/gi';
import { typeColors } from '../../constants/typeColors';
import { PrimaryAilment } from '../../interfaces/Ailment';
import { useContext } from 'react';
import { BaseSizeContext } from '../../hooks/useBaseSize';

export const PrimaryAilmentIcon = ({
	primaryAilment,
	size,
}: {
	primaryAilment?: PrimaryAilment;
	size?: number;
}) => {
	const { baseSize } = useContext(BaseSizeContext);
	if (primaryAilment?.type === 'burn') {
		return <BsFire color={typeColors['fire']} size={size ?? baseSize / 3} />;
	}
	if (primaryAilment?.type === 'freeze') {
		return (
			<FaRegSnowflake color={typeColors['ice']} size={size ?? baseSize / 3} />
		);
	}
	if (primaryAilment?.type === 'paralysis') {
		return (
			<FaBoltLightning
				color={typeColors['electric']}
				size={size ?? baseSize / 3}
			/>
		);
	}
	if (primaryAilment?.type === 'poison' || primaryAilment?.type === 'toxic') {
		return (
			<GiPoisonBottle
				color={typeColors['poison']}
				size={size ?? baseSize / 3}
			/>
		);
	}
	if (primaryAilment?.type === 'sleep') {
		return (
			<GiNightSleep color={typeColors['ghost']} size={size ?? baseSize / 3} />
		);
	}

	return <></>;
};
