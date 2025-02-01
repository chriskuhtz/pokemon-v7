import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { SaveFile } from '../../../hooks/useSaveFile';
import { Inventory } from '../../../interfaces/Inventory';
import { isPokeball, ItemType } from '../../../interfaces/Item';
import { Stack } from '../../../uiComponents/Stack/Stack';
import { BattleStep, Opponent } from '../Battle';

export const BattleActions = ({
	inventory,
}: {
	team: SaveFile['pokemon'];
	inventory: Inventory;
	opponent: Opponent;
	goBack: () => void;
	battleStep: BattleStep;
	setBattleStep: (x: BattleStep) => void;
}) => {
	const balls = Object.entries(inventory).filter(([item]) => isPokeball(item));

	return (
		<Stack mode="row">
			{balls.map(([item, amount]) => {
				if (amount <= 0) {
					return;
				}
				return (
					<ItemCard
						key={item}
						item={item as ItemType}
						amount={amount}
						actionElements={[]}
					/>
				);
			})}
		</Stack>
	);
};
