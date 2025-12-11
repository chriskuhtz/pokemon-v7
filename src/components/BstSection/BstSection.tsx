import { useContext } from 'react';
import { maxBst } from '../../constants/baseStatRecord';
import { portraitMode } from '../../constants/gameData/gameData';
import { typeColors, typeContrastColors } from '../../constants/typeColors';
import {
	getHighestStat,
	HIDDEN_STATS_FOR_TOTAL,
} from '../../functions/getHighestStat';
import { getStats } from '../../functions/getStats';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { AnimatedBar } from '../../uiComponents/AnimatedBar/AnimatedBar';
import { Chip } from '../../uiComponents/Chip/Chip';
import { HIDDEN_STATS } from '../OwnedPokemonCard/components/StatDisplay';

export const BstSection = ({
	ownedPokemon,
	data,
	hideExplanation,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	hideExplanation?: boolean;
}) => {
	const {
		saveFile: { settings },
	} = useContext(SaveFileContext);
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
				Total Stats:
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
				{Object.entries(
					getStats(
						data.stats,
						ownedPokemon.xp,
						ownedPokemon.growthRate,
						ownedPokemon.nature,
						ownedPokemon.effortValues,
						settings
					)
				)
					.sort()
					.map(([stat, value]) => {
						const highestStat = getHighestStat({
							ownedPokemon,
							data,
							settings,
						})[1];

						if (!HIDDEN_STATS_FOR_TOTAL.includes(stat)) {
							return (
								<Chip
									key={stat}
									style={{
										width: `calc(100% / ${highestStat} * ${value})`,
										backgroundColor: typeColors[data.types[0].type.name],
										color: typeContrastColors[data.types[0].type.name],
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
			{!hideExplanation && (
				<>
					<p>
						Total Base Stats (equal for all {ownedPokemon.name}), compared to
						the strongest Pokemon:
					</p>
					<AnimatedBar
						max={maxBst}
						offset={
							maxBst -
							data.stats.reduce((sum, summand) => {
								if (HIDDEN_STATS.includes(summand.stat.name)) {
									return sum;
								}
								return sum + summand.base_stat;
							}, 0)
						}
					/>
				</>
			)}
		</div>
	);
};
