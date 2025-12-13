import { useContext, useState } from 'react';
import { useLearnableMoves } from '../../../hooks/useLearnableMoves';
import {
	EvolutionReducerPayload,
	SaveFileContext,
} from '../../../hooks/useSaveFile';
import { Inventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { SelectionBar } from '../../../uiComponents/SelectionBar/SelectionBar';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { MoveEditor } from '../../MoveEditor/MoveEditor';
import { DetailsCard } from './DetailsCard';
import { EvoInfo } from './EvoInfo';
import { HeldItemSelection } from './HeldItemSelection';
import { MovesDisplay } from './MovesDisplay';
import { StatDisplay } from './StatDisplay';

const tabTypes = [
	'DETAILS',
	'HELD ITEM',
	'STATS',
	'EVOLUTION',
	'MOVES',
	'NEW MOVES',
] as const;
type TabType = (typeof tabTypes)[number];

const useNewMovesLabel = (
	ownedPokemon: OwnedPokemon,
	data: PokemonData
): string => {
	const learnableMoves = useLearnableMoves(ownedPokemon, data);

	const numberOfLearnableMoves = learnableMoves.filter(
		(l) =>
			l.learnable && !ownedPokemon.unlockedMoves.some((m) => m === l.move.name)
	).length;
	return `NEW MOVES (${numberOfLearnableMoves})`;
};

export const OwnedPokemonCardContent = ({
	data,
	ownedPokemon,
	takeHeldItem,
	giveHeldItem,
	inventory,
	setNickName,
	evolve,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
	inventory: Inventory;
	setNickName: (x: string | undefined) => void;
	evolve: (x: EvolutionReducerPayload) => void;
}) => {
	const { saveFile } = useContext(SaveFileContext);
	const [tab, setTab] = useState<TabType>('DETAILS');

	const newMovesLabel = useNewMovesLabel(ownedPokemon, data);
	return (
		<Stack mode={'column'}>
			<SelectionBar
				options={[...tabTypes]
					.filter((t) => {
						if (t === 'NEW MOVES') {
							return saveFile.settings?.movesLearnableInTeamOverview;
						}
						return true;
					})
					.map((o) => {
						if (o === 'NEW MOVES') {
							return { key: o, label: newMovesLabel };
						}
						return { key: o, label: o };
					})}
				selected={tab}
				select={(x) => setTab(x as TabType)}
			/>
			{tab == 'DETAILS' && (
				<DetailsCard
					ownedPokemon={ownedPokemon}
					data={data}
					setNickName={setNickName}
				/>
			)}
			{tab === 'HELD ITEM' && (
				<HeldItemSelection
					ownedPokemon={ownedPokemon}
					takeHeldItem={takeHeldItem}
					giveHeldItem={giveHeldItem}
				/>
			)}
			{tab === 'STATS' && (
				<StatDisplay ownedPokemon={ownedPokemon} data={data} />
			)}
			{tab === 'EVOLUTION' && (
				<EvoInfo
					ownedPokemon={ownedPokemon}
					data={data}
					inventory={inventory}
					evolve={evolve}
				/>
			)}
			{tab === 'MOVES' && (
				<MovesDisplay
					ownedPokemon={ownedPokemon}
					onlyCurrent={!saveFile.settings?.movesEditableInTeamOverview}
				/>
			)}
			{tab === 'NEW MOVES' && <MoveEditor ownedPokemon={ownedPokemon} />}
		</Stack>
	);
};
