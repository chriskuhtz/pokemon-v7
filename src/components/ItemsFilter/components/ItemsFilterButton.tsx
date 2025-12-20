import {
	ItemsFilterType,
	itemfilterNames,
} from '../../../interfaces/ItemsFilterType';
import { SelectionBar } from '../../../uiComponents/SelectionBar/SelectionBar';

export const ItemsFilterButtons = ({
	itemsFilter,
	setFilter,
}: {
	itemsFilter: ItemsFilterType | undefined;
	setFilter: React.Dispatch<React.SetStateAction<ItemsFilterType | undefined>>;
}) => {
	return (
		<SelectionBar
			allowUndefined
			options={[...itemfilterNames.map((i) => ({ key: i, label: i }))]}
			selected={itemsFilter}
			select={(x) => setFilter(x as ItemsFilterType)}
		/>
	);
};
