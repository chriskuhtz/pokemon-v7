import { useMemo } from 'react';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const XpBar = ({ xp }: { xp: number }) => {
	const { xpAtNextLevel, xpForThisLevel } = useMemo(
		() => calculateLevelData(xp),
		[xp]
	);

	return (
		<AnimatedBar
			color="#436ebf"
			max={xpAtNextLevel - xpForThisLevel}
			offset={xpAtNextLevel - xp}
			textColor="white"
		/>
	);
};
