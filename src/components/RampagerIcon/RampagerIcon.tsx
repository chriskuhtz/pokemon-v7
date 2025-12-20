import { useContext, useMemo } from 'react';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';

export const RampagerIcon = () => {
	const { addMessage, addMultipleMessages } = useContext(MessageQueueContext);
	const { location } = useContext(LocationContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const defeated = useMemo(
		() =>
			saveFile.handledOccupants.some(
				(h) => h.id === saveFile.currentRampagingPokemon?.id
			),
		[saveFile]
	);

	const handleClear = () => {
		addMessage({
			message: `The rampaging pokemon has been handled`,
		});

		patchSaveFileReducer({
			currentRampagingPokemon: undefined,
			rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
			handledOccupants: saveFile.handledOccupants.filter(
				(h) => saveFile.currentRampagingPokemon?.id !== h.id
			),
		});
	};

	if (!saveFile.currentRampagingPokemon) {
		return <></>;
	}

	if (defeated) {
		return (
			<div className="handledRampager" onClick={() => handleClear()}>
				<PokemonSprite name={saveFile.currentRampagingPokemon.name} />
			</div>
		);
	}
	if (location.mapId !== saveFile.currentRampagingPokemon.route) {
		return <></>;
	}

	return (
		<div
			className="rocketIcon"
			onClick={() =>
				addMultipleMessages([
					{
						message: `A strong ${saveFile.currentRampagingPokemon?.name} is rampaging in the area`,
					},
					{
						message: `As Warden, it is your responsibility to handle it`,
					},
				])
			}
		>
			<PokemonSprite name={saveFile.currentRampagingPokemon.name} />
		</div>
	);
};
