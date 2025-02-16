import { IoIosArrowBack } from 'react-icons/io';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { baseSize } from '../../../constants/gameData';
import { InBattleItem } from '../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Inventory } from '../../../interfaces/Inventory';
import { HealingItemType, isHealingItem } from '../../../interfaces/Item';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const HealingItemSelectionMenu = ({
	inventory,
	chooseMove,
	opponent,
	goBack,
}: {
	inventory: Inventory;
	chooseMove: (x: Omit<InBattleItem, 'round'>) => void;
	opponent: BattlePokemon;
	goBack: () => void;
}) => {
	const healingItems: [HealingItemType, number][] = Object.entries(
		inventory
	).filter(([item]) => isHealingItem(item)) as [HealingItemType, number][];
	return (
		<Banner>
			<>
				<IoIosArrowBack
					role="button"
					tabIndex={0}
					size={baseSize}
					onClick={goBack}
				/>
				<div
					style={{
						display: 'grid',
						gap: '.5rem',
						alignItems: 'center',
						gridTemplateColumns: '1fr 1fr 1fr',
						padding: '.5rem',
					}}
				>
					{healingItems.map(([item, amount]) => {
						if (amount <= 0) {
							return;
						}
						return (
							<ItemCard
								key={item}
								item={item}
								amount={amount}
								actionElements={[]}
								onClick={() =>
									chooseMove({
										item: item,
										type: 'InBattleItem',
										pokemon: opponent,
									})
								}
							/>
						);
					})}
				</div>
			</>
		</Banner>
	);
};
