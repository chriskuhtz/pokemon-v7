import { useContext } from 'react';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';

export const StreakIcon = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { location } = useContext(LocationContext);
	const { saveFile } = useContext(SaveFileContext);

	if (!saveFile.catchStreak || saveFile.catchStreak.mapId !== location.mapId) {
		return <></>;
	}

	const { pokemon, streak } = saveFile.catchStreak;
	return (
		<div
			onClick={() =>
				addMessage({
					message: `current catch streak: ${pokemon}, ${streak}`,
				})
			}
		>
			<strong>{streak}</strong>
			<PokemonSprite name={pokemon} />
		</div>
	);
};
