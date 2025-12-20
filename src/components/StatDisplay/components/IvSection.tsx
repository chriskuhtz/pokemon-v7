import { portraitMode } from '../../../../../constants/gameData/gameData';
import { PokemonName } from '../../../../../constants/pokemonNames';
import {
	typeColors,
	typeContrastColors,
} from '../../../../../constants/typeColors';
import { sumOfIvs } from '../../../../../functions/sumOfIvs';
import { PokemonType } from '../../../../../interfaces/PokemonType';
import { StatObject } from '../../../../../interfaces/StatObject';
import { AnimatedBar } from '../../../../../uiComponents/AnimatedBar/AnimatedBar';
import { Chip } from '../../../../../uiComponents/Chip/Chip';
import { HIDDEN_STATS } from '../StatDisplay';

export const IVsSection = ({
	intrinsicValues,
	type,
	name,
}: {
	type: PokemonType;
	intrinsicValues: StatObject;
	name: PokemonName;
}) => {
	return (
		<div
			style={{
				padding: '.5rem',
				border: '1px solid black',
				borderRadius: '1rem',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
			}}
		>
			<strong
				style={{
					padding: '1rem .5rem',
				}}
			>
				Individual Values:
			</strong>

			<div
				style={{
					padding: '.5rem',
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: portraitMode ? '1fr' : '1fr 1fr 1fr',
					alignItems: 'center',
				}}
			>
				{Object.entries(intrinsicValues)
					.sort()
					.map(([stat, value]) => {
						const highestStat = 31;

						if (!HIDDEN_STATS.includes(stat)) {
							return (
								<Chip
									key={stat}
									style={{
										width: `calc(100% / ${highestStat} * ${value})`,
										backgroundColor: typeColors[type],
										color: typeContrastColors[type],
									}}
								>
									<>
										{stat}: {value}
									</>
								</Chip>
							);
						}
					})}
			</div>
			<p>Your {name}´s unique values</p>
			<AnimatedBar max={186} offset={186 - sumOfIvs(intrinsicValues)} />
		</div>
	);
};
