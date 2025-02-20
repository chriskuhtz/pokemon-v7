import { useState } from 'react';
import { getStats } from '../../../functions/getStats';
import { getTypeNames } from '../../../functions/getTypeNames';
import { Inventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { Banner } from '../../../uiComponents/Banner/Banner';
import { Chip } from '../../../uiComponents/Chip/Chip';
import { HappinessIcon } from '../../HappinessIcon/HappinessIcon';
import { HpBar } from '../../HpBar/HpBar';
import { LevelBar } from '../../LevelBar/LevelBar';
import { PrimaryAilmentIcon } from '../../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { StatDisplay } from './StatDisplay';

export const HIDDEN_STATS = ['accuracy', 'evasion', 'hp'];

export const OwnedPokemonCardContent = ({
	ownedPokemon,
	data,
	takeHeldItem,
	giveHeldItem,
	inventory,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
}) => {
	const [heldItemMenuOpen, setHeldItemMenuOpen] = useState<boolean>(false);
	const typeNames = getTypeNames({ ...ownedPokemon, data });
	return (
		<div>
			{heldItemMenuOpen && (
				<Banner>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
							padding: '1rem',
						}}
					>
						{Object.entries(inventory).map(([item, amount]) => {
							if (amount > 0) {
								return (
									<button
										tabIndex={0}
										style={{ backgroundColor: 'white' }}
										key={item}
										onClick={() => {
											giveHeldItem(item as ItemType);
											setHeldItemMenuOpen(false);
										}}
									>
										{item}
									</button>
								);
							}
						})}
					</div>
				</Banner>
			)}
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
					<h5>{typeNames.join('/')} type</h5>
					<PrimaryAilmentIcon primaryAilment={ownedPokemon.primaryAilment} />
				</div>

				<div>
					<h4>{data.name.toUpperCase()}</h4>
					{ownedPokemon.heldItemName ? (
						<h5 style={{ display: 'flex', gap: '.5rem' }}>
							Held Item: {ownedPokemon.heldItemName}
							<Chip onClick={takeHeldItem}>
								<>Take</>
							</Chip>
						</h5>
					) : (
						<Chip onClick={() => setHeldItemMenuOpen(true)}>
							<>Give Held Item</>
						</Chip>
					)}
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
			<StatDisplay ownedPokemon={ownedPokemon} data={data} />
		</div>
	);
};
