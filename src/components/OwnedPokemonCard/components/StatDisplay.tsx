import { typeColors, typeContrastColors } from '../../../constants/typeColors';
import { getStats } from '../../../functions/getStats';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { Chip } from '../../../uiComponents/Chip/Chip';
import { HIDDEN_STATS } from './OwnedPokemonCardContent';

export const StatDisplay = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}) => {
	return (
		<div
			style={{
				margin: '.5rem',
				borderLeft: '1px solid black',
				borderBottom: '1px solid black',
				borderBottomLeftRadius: '.5rem',
			}}
		>
			<strong
				style={{
					padding: '1rem .5rem',
				}}
			>
				Stats:
			</strong>
			<div
				style={{
					padding: '.5rem',
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: '1fr 1fr 1fr',
					alignItems: 'center',
				}}
			>
				{Object.entries(
					getStats(
						data.stats,
						ownedPokemon.xp,
						ownedPokemon.nature,
						ownedPokemon.effortValues
					)
				).map(([stat, value]) => {
					const highestStat = Object.entries(
						getStats(
							data.stats,
							ownedPokemon.xp,
							ownedPokemon.nature,
							ownedPokemon.effortValues
						)
					)
						.filter(([stat]) => !HIDDEN_STATS.includes(stat))
						.sort((a, b) => b[1] - a[1])[0][1];

					if (!HIDDEN_STATS.includes(stat)) {
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
		</div>
	);
};
