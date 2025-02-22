import { OccupantName } from '../../../constants/checkLists/occupantsRecord';
import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { Message } from '../../../hooks/useMessageQueue';
import { Inventory } from '../../../interfaces/Inventory';
import { Occupant } from '../../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../../interfaces/SaveFile';

export const interactWithFunction = ({
	occ,
	addMultipleMessages,
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
	addMultipleMessages: (x: Message[]) => void;
	cutterPokemon?: { dexId: number };
	openStorage: (stepsTaken: number) => void;
	stepsTaken: number;
	changeOccupant: (id: OccupantName, updatedOccupant: Occupant) => void;
	playerLocation: CharacterLocationData;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: OccupantName) => void;
	handleThisOccupant: (id: OccupantName) => void;
	handledOccupants: OccupantName[];
	goToPosition: (x: CharacterLocationData) => void;
}) => {
	if (!occ) {
		return;
	}
	const [id, data] = occ as [OccupantName, Occupant];

	if (data.type === 'PORTAL') {
		goToPosition(data.portal);
		return;
	}
	if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
		addMultipleMessages([
			{
				message: `Found ${data.amount} ${data.item}`,
				onRemoval: () => handleThisOccupant(id),
			},
		]);
		return;
	}
	if (data.type === 'BUSH' && !handledOccupants.includes(id)) {
		if (cutterPokemon) {
			addMultipleMessages([
				{
					message: `Your Pokemon used cut`,
					onRemoval: () => handleThisOccupant(id),
				},
			]);
		} else addMultipleMessages([{ message: 'Maybe a Pokemon can cut this' }]);
		return;
	}
	if (
		data.type === 'PC' &&
		playerLocation.orientation === data.approachDirection
	) {
		addMultipleMessages([
			{
				message: 'Accessing Pokemon Storage',
				onRemoval: () => openStorage(stepsTaken),
			},
		]);
		return;
	}
	if (
		data.type === 'SIGN' &&
		playerLocation.orientation === data.approachDirection
	) {
		addMultipleMessages(data.dialogue.map((d) => ({ message: d })));

		return;
	}
	if (data.type === 'MERCHANT') {
		changeOccupant(id, {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToMarket(data.inventory, stepsTaken)
						: undefined,
			}))
		);

		return;
	}
	if (data.type === 'NURSE') {
		changeOccupant(id, {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1 ? () => talkToNurse(id) : undefined,
			}))
		);

		return;
	}
	if (data.type === 'NPC') {
		changeOccupant(id, {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		if (!handledOccupants.includes(id)) {
			addMultipleMessages(
				data.unhandledMessage.map((d, i) => ({
					message: d,
					onRemoval:
						i === data.unhandledMessage.length - 1
							? () => handleThisOccupant(id)
							: undefined,
				}))
			);
		} else {
			addMultipleMessages(
				(data.handledMessage ?? data.unhandledMessage).map((d) => ({
					message: d,
				}))
			);
		}

		return;
	}
	if (data.type === 'TRAINER') {
		changeOccupant(id, {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});

		if (!handledOccupants.includes(id)) {
			addMultipleMessages(
				data.unhandledMessage.map((d, i) => ({
					message: d,
					onRemoval:
						i === data.unhandledMessage.length - 1
							? () => handleThisOccupant(id)
							: undefined,
				}))
			);
		} else {
			addMultipleMessages(
				(data.handledMessage ?? data.unhandledMessage).map((d) => ({
					message: d,
				}))
			);
		}

		return;
	}

	console.error('what is this occupant', occ);
};
