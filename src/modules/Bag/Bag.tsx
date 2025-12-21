import React, { useContext, useMemo } from 'react';
import { FaRunning } from 'react-icons/fa';
import { MdHealing } from 'react-icons/md';
import { BagLimitBar } from '../../components/BagLimitBar/BagLimitBar';
import { HealAction } from '../../components/HealAction/HealAction';
import { ThrowAwayAction } from '../../components/ItemCard/components/ThrowAwayAction';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { ItemInfoButton } from '../../components/ItemInfoButton/ItemInfoButton';
import { useFilteredInventory } from '../../components/ItemsFilter/ItemsFilter';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { canBenefitFromItem } from '../../functions/canBenefitFromItem';
import { useEscapeRope } from '../../hooks/useEscapeRope';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { isItem, isKeyItem, ItemType } from '../../interfaces/Item';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Bag = ({ goBack }: { goBack: () => void }): JSX.Element => {
	const { applyEscapeRope, disabled } = useEscapeRope();
	const {
		saveFile,
		applyItemToPokemonReducer: applyItem,
		useSacredAshReducer: applySacredAsh,
		discardItemReducer: discardItem,
	} = useContext(SaveFileContext);

	const { bag: inventory } = saveFile;
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile.pokemon]
	);

	const { filteredInventory, buttons } = useFilteredInventory(inventory, true);
	return (
		<Page goBack={goBack} headline="Inventory:">
			<Stack mode="column">
				<h4>Bag Capacity:</h4>
				<BagLimitBar />
				{buttons}
				{Object.entries(filteredInventory).map(([item, amount]) => {
					if (amount <= 0) {
						return <React.Fragment key={item}></React.Fragment>;
					}

					if (item === 'escape-rope') {
						return (
							<ItemCard
								key={item}
								item={item as ItemType}
								amount={amount}
								actionElements={[
									<ThrowAwayAction
										amount={amount}
										item={item}
										discardItem={(x: number) =>
											discardItem(item as ItemType, x)
										}
									/>,
									disabled ? undefined : (
										<FaRunning
											tabIndex={0}
											role="button"
											onKeyDown={(e) => {
												e.stopPropagation();
												if (e.key === 'Enter') {
													applyEscapeRope();
												}
											}}
											onClick={() => applyEscapeRope()}
											size={battleSpriteSize}
										/>
									),
								].filter((e) => e !== undefined)}
							/>
						);
					}
					return (
						<ItemCard
							key={item}
							item={item as ItemType}
							amount={amount}
							actionElements={[
								<ItemInfoButton itemName={item as ItemType} />,
								isItem(item) &&
								team.filter((t) => canBenefitFromItem(t, item)).length > 0 ? (
									<HealAction
										item={item}
										applyItem={applyItem}
										healablePokemon={team.filter((t) =>
											canBenefitFromItem(t, item)
										)}
									/>
								) : (
									<></>
								),
								item === 'sacred-ash' ? (
									<MdHealing
										tabIndex={0}
										role="button"
										onKeyDown={(e) => {
											e.stopPropagation();
											if (e.key === 'Enter') {
												applySacredAsh();
											}
										}}
										onClick={() => applySacredAsh()}
										size={battleSpriteSize}
									/>
								) : (
									<></>
								),
								isKeyItem(item) ? (
									<></>
								) : (
									<ThrowAwayAction
										item={item as ItemType}
										amount={amount}
										discardItem={(x: number) =>
											discardItem(item as ItemType, x)
										}
									/>
								),
							]}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
