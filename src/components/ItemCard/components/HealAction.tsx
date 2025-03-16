import { useState } from 'react';
import { MdHealing } from 'react-icons/md';
import { MoveName } from '../../../constants/checkLists/movesCheckList';
import { battleSpriteSize } from '../../../constants/gameData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getMovesArray } from '../../../functions/getMovesArray';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { isPPBoostItem, ItemType } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Banner } from '../../../uiComponents/Banner/Banner';

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
					<h3>Which Pokemon should receive the {item}:</h3>
					{healablePokemon.map((p) => (
						<img
							key={p.id}
							src={getPokemonSprite(p.name)}
							onClick={() => {
								if (
									['ether', 'max-ether'].includes(item) ||
									isPPBoostItem(item)
								) {
									setSelectedPokemon(p);
									setPokemonSelectionOpen(false);
								} else {
									applyItem(p, item);
									setPokemonSelectionOpen(false);
								}
							}}
							tabIndex={0}
							role="button"
							onKeyDown={(e) => {
								e.stopPropagation();
								if (e.key === 'Enter') {
									if (
										['ether', 'max-ether'].includes(item) ||
										isPPBoostItem(item)
									) {
										setSelectedPokemon(p);
										setPokemonSelectionOpen(false);
									} else {
										applyItem(p, item);
										setPokemonSelectionOpen(false);
									}
								}
							}}
						/>
					))}
				</Banner>
			)}
			{selectedPokemon && (
				<Banner>
					<strong
						onClick={() => {
							setPokemonSelectionOpen(false);
							setSelectedPokemon(undefined);
						}}
					>
						X
					</strong>
					<h3>For which Move should {item} be used:</h3>
					{getMovesArray(selectedPokemon)
						.filter((m) => canBenefitFromItem(selectedPokemon, item, m.name))
						.map((m) => (
							<button
								style={{ backgroundColor: 'white' }}
								key={m.name}
								onClick={() => {
									applyItem(selectedPokemon, item, m.name);
									setPokemonSelectionOpen(false);
									setSelectedPokemon(undefined);
								}}
								tabIndex={0}
								role="button"
								onKeyDown={(e) => {
									e.stopPropagation();
									if (e.key === 'Enter') {
										applyItem(selectedPokemon, item, m.name);
										setPokemonSelectionOpen(false);
										setSelectedPokemon(undefined);
									}
								}}
							>
								{m.name}
							</button>
						))}
				</Banner>
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
