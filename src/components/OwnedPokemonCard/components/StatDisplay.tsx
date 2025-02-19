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
		<>
			<div
				style={{
					paddingTop: '1rem',
					paddingLeft: '.5rem',
				}}
			>
				Stats:
			</div>
			<div
				style={{
					paddingLeft: '.5rem',
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: '1fr 1fr 1fr',
					alignItems: 'center',
				}}
			>
				{Object.entries(
					getStats(data.stats, ownedPokemon.xp, ownedPokemon.nature)
				).map(([stat, value]) => {
					const highestStat = Object.entries(
						getStats(data.stats, ownedPokemon.xp, ownedPokemon.nature)
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
		</>
	);
};
