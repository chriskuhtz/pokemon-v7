import { getStats } from '../../../functions/getStats';
import { getTypeNames } from '../../../functions/getTypeNames';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { HappinessIcon } from '../../HappinessIcon/HappinessIcon';
import { HpBar } from '../../HpBar/HpBar';
import { LevelBar } from '../../LevelBar/LevelBar';

export const OwnedPokemonCardContent = ({
	ownedPokemon,
	data,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
}) => {
	const typeNames = getTypeNames(data.types);
	return (
		<div
			style={{
				paddingLeft: '.5rem',
				display: 'grid',
				gap: '1.5rem',
				gridTemplateColumns: '1fr 1fr 1fr',
				alignItems: 'center',
			}}
		>
			<div>
				<div style={{ display: 'flex', gap: '2.5rem' }}>
					<HappinessIcon value={ownedPokemon.happiness} />
					<LevelBar xp={ownedPokemon.xp} />
				</div>

				<HpBar
					max={getStats(data.stats, ownedPokemon.xp, ownedPokemon.nature).hp}
					damage={ownedPokemon.damage}
				/>
			</div>
			<div>
				<h4>{data.name.toUpperCase()}</h4>
				<h5>{typeNames.join('/')} type</h5>
				<h5>{ownedPokemon.nature} nature</h5>
				<h5>ability: {ownedPokemon.ability}</h5>
			</div>

			<div>
				<h4>Moves:</h4>
				<h5>{ownedPokemon.firstMove.name}</h5>
				<h5>{ownedPokemon.secondMove?.name}</h5>
				<h5>{ownedPokemon.thirdMove?.name}</h5>
				<h5>{ownedPokemon.fourthMove?.name}</h5>
			</div>
		</div>
	);
};
