import { useState } from 'react';
import { MdHealing } from 'react-icons/md';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { MoveName } from '../../constants/movesCheckList';
import { ItemType } from '../../interfaces/Item';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { Banner } from '../../uiComponents/Banner/Banner';
import { HealablePokemon } from './components/HealablePokemon';
import { RefillableMoves } from './components/RefillableMoves';

export const HealAction = ({
	item,
	healablePokemon,
	applyItem,
}: {
	item: ItemType;
	healablePokemon: OwnedPokemon[];
	applyItem: (pokemon: OwnedPokemon, item: ItemType, move?: MoveName) => void;
}) => {
	const [pokemonSelectionOpen, setPokemonSelectionOpen] =
		useState<boolean>(false);
	const [selectedPokemon, setSelectedPokemon] = useState<
		OwnedPokemon | undefined
	>();

	return (
		<>
			{pokemonSelectionOpen && healablePokemon.length > 0 && (
				<Banner>
					<strong onClick={() => setPokemonSelectionOpen(false)}>X</strong>
					<h3
						style={{
							minHeight: battleSpriteSize * 3,
							paddingTop: battleSpriteSize,
						}}
					>
						Which Pokemon should receive the {item}:
					</h3>
					{healablePokemon.map((p) => (
						<HealablePokemon
							p={p}
							item={item}
							applyItem={(a, b, c) => {
								applyItem(a, b, c);
								setPokemonSelectionOpen(false);
							}}
							setSelectedPokemon={(p) => {
								setSelectedPokemon(p);
								setPokemonSelectionOpen(false);
							}}
						/>
					))}
				</Banner>
			)}
			{selectedPokemon && (
				<RefillableMoves
					selectedPokemon={selectedPokemon}
					item={item}
					applyItem={(a, b, c) => {
						applyItem(a, b, c);
						setPokemonSelectionOpen(false);
						setSelectedPokemon(undefined);
					}}
					cancel={() => {
						setPokemonSelectionOpen(false);
						setSelectedPokemon(undefined);
					}}
				/>
			)}
			<MdHealing
				tabIndex={0}
				role="button"
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'Enter') {
						setPokemonSelectionOpen(true);
					}
				}}
				onClick={() => setPokemonSelectionOpen(true)}
				size={battleSpriteSize}
			/>
		</>
	);
};
