import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { baseSize } from '../../../constants/gameData';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { getStats } from '../../../functions/getStats';
import { getTypeNames } from '../../../functions/getTypeNames';
import { Inventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { SelectionListModal } from '../../../uiComponents/SelectionListModal/SelectionListModal';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { HappinessIcon } from '../../HappinessIcon/HappinessIcon';
import { HpBar } from '../../HpBar/HpBar';
import { PrimaryAilmentIcon } from '../../PrimaryAilmentIcon/PrimaryAilmentIcon';
import { XpBar } from '../../XpBar/XpBar';
import { EvoInfo } from './EvoInfo';
import { MovesDisplay } from './MovesDisplay';
import { NickNameModal } from './NickNameModal';
import { StatDisplay } from './StatDisplay';

export const HIDDEN_STATS = ['accuracy', 'evasion', 'hp'];

export const OwnedPokemonCardContent = ({
	ownedPokemon,
	data,
	takeHeldItem,
	giveHeldItem,
	inventory,
	setMoves,
	setNickName,
	evolve,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
	setMoves: (id: string, moves: MoveName[]) => void;
	setNickName: (x: string | undefined) => void;
	evolve: (newDexId: number, newName: string, item?: ItemType) => void;
}) => {
	const [heldItemMenuOpen, setHeldItemMenuOpen] = useState<boolean>(false);
	const [nickNameMenuOpen, setNickNameMenuOpen] = useState<boolean>(false);

	const typeNames = getTypeNames({ ...ownedPokemon, data });
	const { level } = calculateLevelData(ownedPokemon.xp);

	return (
		<div>
			<NickNameModal
				open={nickNameMenuOpen}
				close={() => setNickNameMenuOpen(false)}
				nickname={ownedPokemon.nickname}
				setNickName={setNickName}
			/>
			<SelectionListModal
				selected={ownedPokemon.heldItemName ? [ownedPokemon.heldItemName] : []}
				open={heldItemMenuOpen}
				close={() => setHeldItemMenuOpen(false)}
				options={[
					ownedPokemon.heldItemName,
					...Object.entries(inventory)
						.filter(([, amount]) => amount > 0)
						.map(([item]) => item),
				].filter((s) => s !== undefined)}
				min={1}
				max={1}
				toggle={(item) => {
					if (ownedPokemon.heldItemName) {
						takeHeldItem();
					}
					if (item !== ownedPokemon.heldItemName) {
						giveHeldItem(item as ItemType);
					}

					setHeldItemMenuOpen(false);
				}}
			/>
			<Stack mode="column">
				<div
					style={{
						paddingLeft: '.5rem',
						display: 'grid',
						gap: '1.5rem',
						gridTemplateColumns: '2fr 2fr 1fr',
						alignItems: 'center',
					}}
				>
					<div>
						<HpBar
							max={
								getStats(
									data.stats,
									ownedPokemon.xp,
									ownedPokemon.nature,
									ownedPokemon.effortValues
								).hp
							}
							damage={ownedPokemon.damage}
						/>
						<XpBar xp={ownedPokemon.xp} />

						<PrimaryAilmentIcon primaryAilment={ownedPokemon.primaryAilment} />

						<h5 style={{ display: 'flex', gap: '.5rem' }}>
							Held Item: {ownedPokemon.heldItemName ?? 'none'}{' '}
							<MdEdit
								size={baseSize / 4}
								onClick={() => setHeldItemMenuOpen(true)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									e.stopPropagation();
									if (e.key === 'Enter') {
										setHeldItemMenuOpen(true);
									}
								}}
							/>
						</h5>
					</div>

					<div>
						<h4>
							Lvl {level} {ownedPokemon.nickname ?? data.name}/{data.name}{' '}
							<MdEdit
								role="button"
								tabIndex={0}
								size={baseSize / 4}
								onClick={() => setNickNameMenuOpen(true)}
								onKeyDown={(e) => {
									e.stopPropagation();
									if (e.key === 'Enter') {
										setNickNameMenuOpen(true);
									}
								}}
							/>
						</h4>

						<h5>type: {typeNames.join('/')} </h5>
						<h5>nature: {ownedPokemon.nature}</h5>
						<h5>ability: {ownedPokemon.ability}</h5>
					</div>
					<div>
						<HappinessIcon value={ownedPokemon.happiness} />
					</div>
				</div>
				<MovesDisplay
					ownedPokemon={ownedPokemon}
					data={data}
					setMoves={setMoves}
				/>
				<StatDisplay ownedPokemon={ownedPokemon} data={data} />{' '}
				<EvoInfo
					ownedPokemon={ownedPokemon}
					data={data}
					inventory={inventory}
					evolve={evolve}
				/>
			</Stack>
		</div>
	);
};
