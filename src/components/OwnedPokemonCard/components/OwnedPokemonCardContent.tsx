import { useContext, useState } from 'react';
import { MoveName } from '../../../constants/movesCheckList';
import {
	EvolutionReducerPayload,
	SaveFileContext,
} from '../../../hooks/useSaveFile';
import { Inventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { MoveEditor } from '../../../modules/MoveTutor/MoveTutor';
import { SelectionBar } from '../../../uiComponents/SelectionBar/SelectionBar';
import { DetailsCard } from './DetailsCard';
import { EvoInfo } from './EvoInfo';
import { HeldItemSelection } from './HeldItemSelection';
import { MovesDisplay } from './MovesDisplay';
import { StatDisplay } from './StatDisplay';
import { Stack } from '../../../uiComponents/Stack/Stack';

const tabTypes = [
	'DETAILS',
	'HELD ITEM',
	'STATS',
	'EVOLUTION',
	'MOVES',
	'NEW MOVES',
] as const;
type TabType = (typeof tabTypes)[number];

export const OwnedPokemonCardContent = ({
	data,
	ownedPokemon,
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
	evolve: (x: EvolutionReducerPayload) => void;
}) => {
	const { saveFile } = useContext(SaveFileContext);
	const [tab, setTab] = useState<TabType>('DETAILS');

	return (
		<Stack mode={'column'}>
			<SelectionBar
				options={[...tabTypes].filter((t) => {
					if (t === 'NEW MOVES') {
						return saveFile.settings?.movesLearnableInTeamOverview;
					}
					return true;
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
					setMoves={setMoves}
					onlyCurrent={!saveFile.settings?.movesEditableInTeamOverview}
				/>
			)}
			{tab === 'NEW MOVES' && <MoveEditor ownedPokemon={ownedPokemon} />}
		</Stack>
	);
};
