import { useContext, useMemo } from 'react';
import {
	TbCircleLetterAFilled,
	TbCircleLetterGFilled,
	TbCircleLetterMFilled,
	TbCircleLetterPFilled,
	TbCircleLetterRFilled,
} from 'react-icons/tb';
import { battleSpriteSize } from '../../constants/gameData/gameData';
import { typeColors } from '../../constants/typeColors';
import { troubleMakersRemaining } from '../../functions/areAllRocketsDefeated';
import { LocationContext } from '../../hooks/LocationProvider';
import { MessageQueueContext } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';
import './TroubleMakersIcon.css';

export const TroubleMakersIcon = () => {
	const { addMessage } = useContext(MessageQueueContext);
	const { location } = useContext(LocationContext);
	const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);

	const remaining = useMemo(() => troubleMakersRemaining(saveFile), [saveFile]);

	const handleClear = () => {
		addMessage({
			message: `All ${
				saveFile.troubleMakers?.affiliation ?? 'rocket'
			} Members defeated, Rangerlevel increased`,
		});

		patchSaveFileReducer({
			troubleMakers: undefined,
			rangerLevel: (saveFile.rangerLevel ?? 0) + 1,
			handledOccupants: saveFile.handledOccupants.filter(
				(h) => !saveFile.troubleMakers?.trainers.some((t) => t.id === h.id)
			),
		});
	};

	if (!saveFile.troubleMakers) {
		return <></>;
	}

	const { affiliation } = saveFile.troubleMakers;
	if (remaining === 0) {
		if (affiliation === 'aqua') {
			return (
				<TbCircleLetterAFilled
					className={'rocketIcon'}
					size={battleSpriteSize}
					color={typeColors['grass']}
					onClick={handleClear}
				/>
			);
		}
		if (affiliation === 'galactic') {
			return (
				<TbCircleLetterPFilled
					className={'rocketIcon'}
					size={battleSpriteSize}
					color={typeColors['grass']}
					onClick={handleClear}
				/>
			);
		}
		if (affiliation === 'magma') {
			return (
				<TbCircleLetterMFilled
					className={'rocketIcon'}
					size={battleSpriteSize}
					color={typeColors['grass']}
					onClick={handleClear}
				/>
			);
		}
		return (
			<TbCircleLetterRFilled
				className={'rocketIcon'}
				size={battleSpriteSize}
				color={typeColors['grass']}
				onClick={handleClear}
			/>
		);
	}
	if (location.mapId !== saveFile.troubleMakers.route) {
		return <></>;
	}

	if (affiliation === 'aqua') {
		return (
			<TbCircleLetterAFilled
				size={battleSpriteSize}
				color={typeColors['fighting']}
				onClick={() =>
					addMessage({ message: `${remaining} Aqua Members remaining` })
				}
			/>
		);
	}
	if (affiliation === 'magma') {
		return (
			<TbCircleLetterMFilled
				size={battleSpriteSize}
				color={typeColors['fighting']}
				onClick={() =>
					addMessage({
						message: `${remaining} Magma Members remaining`,
					})
				}
			/>
		);
	}
	if (affiliation === 'galactic') {
		return (
			<TbCircleLetterGFilled
				size={battleSpriteSize}
				color={typeColors['fighting']}
				onClick={() =>
					addMessage({ message: `${remaining} galactic Members remaining` })
				}
			/>
		);
	}

	return (
		<TbCircleLetterRFilled
			size={battleSpriteSize}
			color={typeColors['fighting']}
			onClick={() =>
				addMessage({ message: `${remaining} Rocket Trainers remaining` })
			}
		/>
	);
};

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
