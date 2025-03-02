import { Message } from '../../../hooks/useMessageQueue';
import { Inventory } from '../../../interfaces/Inventory';
import { Occupant } from '../../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../../interfaces/SaveFile';

export const interactWithFunction = ({
	occ,
	addMultipleMessages,
	openStorage,
	stepsTaken,
	//changeOccupant,
	playerLocation,
	goToMarket,
	talkToNurse,
	handledOccupants,
	handleThisOccupant,
	cutterPokemon,
	goToPosition,
}: {
	occ: Occupant | undefined;
	addMultipleMessages: (x: Message[]) => void;
	cutterPokemon?: { dexId: number };
	openStorage: (stepsTaken: number) => void;
	stepsTaken: number;
	changeOccupant: (id: string, updatedOccupant: Occupant) => void;
	playerLocation: CharacterLocationData;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: string) => void;
	handleThisOccupant: (id: string) => void;
	handledOccupants: string[];
	goToPosition: (x: CharacterLocationData) => void;
}) => {
	if (!occ) {
		return;
	}
	const data = occ;

	if (data.type === 'PORTAL') {
		goToPosition(data.portal);
		return;
	}
	if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
		addMultipleMessages([
			{
				message: `Found ${data.amount} ${data.item}`,
				onRemoval: () => handleThisOccupant(occ.id),
			},
		]);
		return;
	}
	if (data.type === 'BUSH' && !handledOccupants.includes(occ.id)) {
		if (cutterPokemon) {
			addMultipleMessages([
				{
					message: `Your Pokemon used cut`,
					onRemoval: () => handleThisOccupant(occ.id),
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
		//disable for now because of drawing bug
		// changeOccupant(occ.id, {
		// 	...data,
		// 	orientation: getOppositeDirection(playerLocation.orientation),
		// });

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
		//disable for now because of drawing bug
		// changeOccupant(occ.id, {
		// 	...data,
		// 	orientation: getOppositeDirection(playerLocation.orientation),
		// });

		addMultipleMessages([
			...data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => talkToNurse(occ.id)
						: undefined,
			})),
			{ message: 'Whole Team fully healed' },
		]);

		return;
	}
	if (data.type === 'NPC') {
		//disable for now because of drawing bug
		// changeOccupant(occ.id, {
		// 	...data,
		// 	orientation: getOppositeDirection(playerLocation.orientation),
		// });

		if (!handledOccupants.includes(occ.id)) {
			addMultipleMessages(
				[
					...data.unhandledMessage.map((d, i) => ({
						message: d,
						onRemoval:
							i === data.unhandledMessage.length - 1
								? () => handleThisOccupant(occ.id)
								: undefined,
					})),
					...Object.entries(data.gifts ?? {}).map(([item, amount]) => ({
						message: `received ${amount} ${item}`,
					})),
					data.quest ? { message: `new quest: ${data.quest}` } : undefined,
				].filter((m) => m !== undefined)
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
		//disable for now because of drawing bug
		// changeOccupant(occ.id, {
		// 	...data,
		// 	orientation: getOppositeDirection(playerLocation.orientation),
		// });

		if (!handledOccupants.includes(occ.id)) {
			addMultipleMessages(
				data.unhandledMessage.map((d, i) => ({
					message: d,
					onRemoval:
						i === data.unhandledMessage.length - 1
							? () => handleThisOccupant(occ.id)
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
