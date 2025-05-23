import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useContext, useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { battleSpriteSize } from '../../constants/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { ItemType } from '../../interfaces/Item';
import { ItemData } from '../../interfaces/ItemData';

export const ItemInfoButton = ({
	itemName,
	small,
}: {
	itemName: ItemType;
	small?: boolean;
}) => {
	const { addMultipleMessages, latestMessage } =
		useContext(MessageQueueContext);
	const [skip, setSkip] = useState<boolean>(true);
	const { res, invalidate } = useFetch<ItemData>(async () => {
		if (!skip) {
			return (await fetch(`https://pokeapi.co/api/v2/item/${itemName}`)).json();
		}
	});

	useEffect(() => {
		if (res && skip === false && !latestMessage) {
			addMultipleMessages([
				{
					message:
						res['effect_entries'].length > 0
							? res['effect_entries'][0]['short_effect']
							: 'No Description available',
					onRemoval: () => {
						invalidate();
						setSkip(true);
					},
				},
			]);
		}
	}, [addMultipleMessages, invalidate, latestMessage, res, skip]);

	return (
		<IoMdInformationCircleOutline
			onClick={() => setSkip(false)}
			size={small ? battleSpriteSize / 2 : battleSpriteSize}
		/>
	);
};
