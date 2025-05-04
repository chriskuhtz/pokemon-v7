import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useContext, useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { AbilityName } from '../../constants/checkLists/abilityCheckList';
import { battleSpriteSize } from '../../constants/gameData';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { AbilityDto } from '../../interfaces/AbilityDto';

export const AbilityInfoButton = ({
	abilityName,
	small = false,
}: {
	abilityName: AbilityName;
	small?: boolean;
}) => {
	const { addMultipleMessages, latestMessage } =
		useContext(MessageQueueContext);
	const [skip, setSkip] = useState<boolean>(true);
	const { res, invalidate } = useFetch<AbilityDto>(async () => {
		if (!skip) {
			return (
				await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`)
			).json();
		}
	});

	useEffect(() => {
		if (res && skip === false && !latestMessage) {
			addMultipleMessages([
				{
					message: res['effect_entries'][0]['short_effect'],
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
