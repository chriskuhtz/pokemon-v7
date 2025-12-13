import { useContext } from 'react';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { getHeldItem } from '../../../functions/getHeldItem';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { ItemType, isKeyItem } from '../../../interfaces/Item';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { ItemSelectionOption } from '../../ItemSelectionListModal/ItemSelectionListModal';

export const HeldItemSelection = ({
	ownedPokemon,
	takeHeldItem,
	giveHeldItem,
}: {
	ownedPokemon: OwnedPokemon;
	giveHeldItem: (newItem: ItemType) => void;
	takeHeldItem: () => void;
}) => {
	const heldItem = getHeldItem(ownedPokemon);
	const {
		saveFile: { bag },
	} = useContext(SaveFileContext);

	return (
		<Stack mode="column">
			{heldItem && (
				<ItemSelectionOption
					label={`take ${heldItem}`}
					item={heldItem}
					isSelected={true}
					toggle={takeHeldItem}
				/>
			)}
			{Object.entries(bag)
				.filter(([item, amount]) => !isKeyItem(item) && amount > 0)
				.map(([item]) => item)
				.filter((s) => s !== undefined && s !== heldItem)
				.map((item) => (
					<ItemSelectionOption
						item={item as ItemType}
						isSelected={item === heldItem}
						toggle={(x) => giveHeldItem(x as ItemType)}
					/>
				))}
		</Stack>
	);
};

export const ApplyItemSection = ({
	ownedPokemon,
}: {
	ownedPokemon: OwnedPokemon;
}) => {
	const heldItem = getHeldItem(ownedPokemon);
	const {
		saveFile: { bag },
		applyItemToPokemonReducer,
	} = useContext(SaveFileContext);

	return (
		<Stack mode="column">
			{Object.entries(bag)
				.filter(
					([item, amount]) =>
						amount > 0 && canBenefitFromItem(ownedPokemon, item as ItemType)
				)
				.map(([item]) => item)
				.filter((s) => s !== undefined && s !== heldItem)
				.map((item) => (
					<ItemSelectionOption
						item={item as ItemType}
						isSelected={item === heldItem}
						label={`Apply ${item} to ${ownedPokemon.name}`}
						toggle={() =>
							applyItemToPokemonReducer(ownedPokemon, item as ItemType)
						}
					/>
				))}
		</Stack>
	);
};
