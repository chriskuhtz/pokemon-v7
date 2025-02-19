import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Chip } from '../../uiComponents/Chip/Chip';
import { HpBar } from '../HpBar/HpBar';

export const BattlePokemonInfo = ({ pokemon }: { pokemon: BattlePokemon }) => {
	return (
		<div
			style={{
				border: '1px solid black',
				padding: '0 2rem',
				borderRadius: 9000,
			}}
			key={pokemon.id}
		>
			{pokemon.data.name}
			{Object.entries(pokemon.statBoosts).map(([stat, boost]) => {
				if (boost !== 0) {
					return (
						<Chip key={stat}>
							<>
								{stat} {boost > 0 ? '+' : ''}
								{boost}
							</>
						</Chip>
					);
				}
			})}
			<HpBar max={pokemon.stats.hp} damage={pokemon.damage} />
		</div>
	);
};
