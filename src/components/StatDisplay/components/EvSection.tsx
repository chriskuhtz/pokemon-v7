import { portraitMode } from '../../../../../constants/gameData/gameData';
import {
	typeColors,
	typeContrastColors,
} from '../../../../../constants/typeColors';
import { PokemonType } from '../../../../../interfaces/PokemonType';
import { StatObject } from '../../../../../interfaces/StatObject';
import { AnimatedBar } from '../../../../../uiComponents/AnimatedBar/AnimatedBar';
import { Chip } from '../../../../../uiComponents/Chip/Chip';
import { HIDDEN_STATS } from '../StatDisplay';

export const EVsSection = ({
	effortValues,
	type,
}: {
	type: PokemonType;
	effortValues: StatObject;
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
				Effort Values:
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
				{Object.entries(effortValues)
					.sort()
					.map(([stat, value]) => {
						const highestStat = 255;

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
			<p>
				Increased by battling or items,up to 510, different opponents boost
				different stats
			</p>
			<AnimatedBar
				max={510}
				offset={
					510 -
					Object.entries(effortValues).reduce((sum, summand) => {
						if (HIDDEN_STATS.includes(summand[0])) {
							return sum;
						}
						return sum + summand[1];
					}, 0)
				}
			/>
		</div>
	);
};
