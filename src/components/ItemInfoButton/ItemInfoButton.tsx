import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useContext, useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { ItemType } from '../../interfaces/Item';
import { ItemData } from '../../interfaces/ItemData';
import { Nature, natures } from '../../interfaces/Natures';

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

export const NatureInfoButton = ({
	nature,
	small,
}: {
	nature: Nature;
	small?: boolean;
}) => {
	const mods = natures[nature];
	const { addMultipleMessages } = useContext(MessageQueueContext);

	return (
		<IoMdInformationCircleOutline
			onClick={() => {
				if (!mods.buff) {
					addMultipleMessages([
						{ message: `${nature} Nature:` },
						{ message: `Neutral, no effect on stats` },
					]);
				} else {
					addMultipleMessages([
						{ message: `${nature} Nature:` },
						{ message: `+ 10% ${mods.buff}` },
						{ message: `- 10% ${mods.debuff}` },
					]);
				}
			}}
			size={small ? battleSpriteSize / 2 : battleSpriteSize}
		/>
	);
};
