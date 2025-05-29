import { battleSpriteSize } from '../../constants/gameData';
import { getItemUrl } from '../../functions/getItemUrl';
import { ItemType } from '../../interfaces/Item';

export const ItemSprite = ({
	item,
	sizeFactor,
	grayscale,
	onClick,
}: {
	item: ItemType;
	sizeFactor?: number;
	grayscale?: boolean;
	onClick?: () => void;
}) => {
	return (
		<img
			src={getItemUrl(item)}
			height={battleSpriteSize * (sizeFactor ?? 1)}
			width={battleSpriteSize * (sizeFactor ?? 1)}
			style={grayscale ? { filter: 'grayscale(1)' } : undefined}
			onClick={onClick}
		/>
	);
};
