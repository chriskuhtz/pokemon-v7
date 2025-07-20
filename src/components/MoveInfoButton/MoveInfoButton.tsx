import { useFetch } from '@potfisch-industries-npm/usefetch';
import { useContext, useEffect, useState } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { MoveName } from '../../constants/movesCheckList';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { MoveDto } from '../../interfaces/Move';

export const MoveInfoButton = ({ movename }: { movename: MoveName }) => {
	const { addMultipleMessages, latestMessage } =
		useContext(MessageQueueContext);
	const [skip, setSkip] = useState<boolean>(true);
	const { res, invalidate } = useFetch<MoveDto>(async () => {
		if (!skip) {
			return (await fetch(`https://pokeapi.co/api/v2/move/${movename}`)).json();
		}
	});

	useEffect(() => {
		if (res && skip === false && !latestMessage) {
			addMultipleMessages([
				{
					icon: (
						<img
							style={{
								borderRadius: 9000,
							}}
							height={battleSpriteSize}
							src={`/typeIcons/${res.type.name}.png`}
						/>
					),
					message: `${res.type.name} Type Attack`,
				},
				{
					message: `${res.damage_class.name} Attack${
						res.power ? `, Power: ${res.power}` : ''
					}, Accuracy: ${res.accuracy}`,
				},
				{
					message: `Target: ${res.target.name}`,
				},
				{
					message: `Priority: ${res.priority}`,
				},
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
			size={battleSpriteSize}
		/>
	);
};
