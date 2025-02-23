import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { Message } from '../../../hooks/useMessageQueue';
import { Inventory } from '../../../interfaces/Inventory';
import { Occupant } from '../../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../../interfaces/SaveFile';

export const interactWithFunction = ({
	occ,
	addMessage,
	openStorage,
	stepsTaken,
	changeOccupant,
	playerLocation,
	goToMarket,
	talkToNurse,
	handledOccupants,
	handleThisOccupant,
	cutterPokemon,
	goToPosition,
}: {
	occ: [string, Occupant] | undefined;
	addMessage: (x: Message) => void;
	cutterPokemon?: { dexId: number };
	openStorage: (stepsTaken: number) => void;
	stepsTaken: number;
	changeOccupant: (id: number, updatedOccupant: Occupant) => void;
	playerLocation: CharacterLocationData;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: number) => void;
	handleThisOccupant: (id: number) => void;
	handledOccupants: number[];
	goToPosition: (x: CharacterLocationData) => void;
}) => {
	if (!occ) {
		return;
	}
	const [id, data] = occ;

	if (data.type === 'PORTAL') {
		goToPosition(data.portal);
		return;
	}
	if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
		addMessage({
			message: `Found ${data.amount} ${data.item}`,
			onRemoval: () => handleThisOccupant(Number.parseInt(id)),
		});
		return;
	}
	if (data.type === 'BUSH' && !handledOccupants.includes(Number.parseInt(id))) {
		if (cutterPokemon) {
			addMessage({
				message: `Your Pokemon used cut`,
				onRemoval: () => handleThisOccupant(Number.parseInt(id)),
			});
		} else addMessage({ message: 'Maybe a Pokemon can cut this' });
		return;
	}
	if (
		data.type === 'PC' &&
		playerLocation.orientation === data.approachDirection
	) {
		addMessage({
			message: 'Accessing Pokemon Storage',
			onRemoval: () => openStorage(stepsTaken),
		});
		return;
	}
	if (
		data.type === 'SIGN' &&
		playerLocation.orientation === data.approachDirection
	) {
		data.dialogue.forEach((d) =>
			addMessage({
				message: d,
			})
		);
		return;
	}
	if (data.type === 'MERCHANT') {
		changeOccupant(Number.parseInt(id), {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});
		data.dialogue.forEach((d, i) =>
			addMessage({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToMarket(data.inventory, stepsTaken)
						: undefined,
			})
		);
		return;
	}
	if (data.type === 'NURSE') {
		changeOccupant(Number.parseInt(id), {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		data.dialogue.forEach((d, i) =>
			addMessage({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => talkToNurse(Number.parseInt(id))
						: undefined,
			})
		);
		return;
	}
	if (data.type === 'NPC') {
		changeOccupant(Number.parseInt(id), {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		if (!handledOccupants.includes(Number.parseInt(id))) {
			data.unhandledMessage.forEach((d, i) =>
				addMessage({
					message: d,
					onRemoval:
						i === data.unhandledMessage.length - 1
							? () => handleThisOccupant(Number.parseInt(id))
							: undefined,
				})
			);
		} else {
			(data.handledMessage ?? data.unhandledMessage).forEach((d) =>
				addMessage({
					message: d,
				})
			);
		}

		return;
	}
	if (data.type === 'TRAINER') {
		changeOccupant(Number.parseInt(id), {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		if (
			!handledOccupants.includes(Number.parseInt(id)) ||
			!data.handledMessage
		) {
			data.unhandledMessage.forEach((d) =>
				addMessage({
					message: d,
				})
			);

			handleThisOccupant(Number.parseInt(id));
		} else {
			data.handledMessage.forEach((d) =>
				addMessage({
					message: d,
				})
			);
		}

		return;
	}

	console.error('what is this occupant', occ);
};
