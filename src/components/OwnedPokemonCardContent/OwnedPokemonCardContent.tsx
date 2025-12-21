import { useContext, useState } from 'react';
import { GameDataContext } from '../../hooks/useGameData';
import { EvolutionReducerPayload } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { Stack } from '../../uiComponents/Stack/Stack';
import { EvoInfo } from '../EvoInfo/EvoInfo';
import { MoveEditor } from '../MoveEditor/MoveEditor';
import { MovesDisplay } from '../MovesDisplay/MovesDisplay';
import { StatDisplay } from '../StatDisplay/StatDisplay';
import { DetailsCard } from './components/DetailsCard';
import { HeldItemSelection } from './components/HeldItemSelection';
import {
	OwnedPokemonCardTabSelection,
	TabType,
} from './components/OwnedPokemonCardTabSelection';
import { ApplyItemSection } from './components/ApplyItemSection';

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
	setNickName: (id: string, newNick: string | undefined) => void;
	evolve: (x: EvolutionReducerPayload) => void;
}) => {
	const gameData = useContext(GameDataContext);
	const [tab, setTab] = useState<TabType>('DETAILS');

	return (
		<Stack mode={'column'}>
			<OwnedPokemonCardTabSelection
				ownedPokemon={ownedPokemon}
				data={data}
				tab={tab}
				setTab={setTab}
			/>
			{tab == 'DETAILS' && (
				<DetailsCard
					ownedPokemon={ownedPokemon}
					data={data}
					setNickName={(newNick) => setNickName(ownedPokemon.id, newNick)}
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
				<MovesDisplay ownedPokemon={ownedPokemon} onlyCurrent={!gameData} />
			)}
			{tab === 'NEW MOVES' && <MoveEditor ownedPokemon={ownedPokemon} />}
			{tab === 'APPLY ITEM' && <ApplyItemSection ownedPokemon={ownedPokemon} />}
		</Stack>
	);
};
