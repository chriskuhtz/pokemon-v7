import { useMemo } from 'react';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { GrowthRateName } from '../../interfaces/PokemonSpeciesData';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';

export const XpBar = ({
	xp,
	growthRate,
}: {
	xp: number;
	growthRate: GrowthRateName;
}) => {
	const { xpAtNextLevel, xpForThisLevel } = useMemo(
		() => calculateLevelData(xp, growthRate),
		[growthRate, xp]
	);

	return (
		<AnimatedBar
			color="#436ebf"
			max={xpAtNextLevel - xpForThisLevel}
			offset={xpAtNextLevel - xp}
		/>
	);
};
