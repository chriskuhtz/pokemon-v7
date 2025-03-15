import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { Message } from '../../../hooks/useMessageQueue';
import { Inventory } from '../../../interfaces/Inventory';
import { Occupant, OccupantType } from '../../../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
} from '../../../interfaces/SaveFile';

export const shouldRotate = (t: OccupantType) =>
	['NURSE', 'NPC', 'MERCHANT', 'CAMP_MANAGER', 'TRAINER'].includes(t);
export const interactWithFunction = ({
	occ,
	addMultipleMessages,
	openStorage,
	stepsTaken,
	rotateOccupant,
	playerLocation,
	goToMarket,
	talkToNurse,
	handledOccupants,
	handleThisOccupant,
	cutterPokemon,
	goToPosition,
	interactWithHoneyTree,
	goToCampMenu,
}: {
	occ: Occupant | undefined;
	addMultipleMessages: (x: Message[]) => void;
	cutterPokemon?: { dexId: number };
	openStorage: (stepsTaken: number) => void;
	stepsTaken: number;
	rotateOccupant: (id: string, newOrientation: CharacterOrientation) => void;
	playerLocation: CharacterLocationData;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: string) => void;
	handleThisOccupant: (occ: Occupant) => void;
	handledOccupants: string[];
	goToPosition: (x: CharacterLocationData) => void;
	interactWithHoneyTree: () => void;
	goToCampMenu: () => void;
}) => {
	if (!occ) {
		return;
	}
	const data = occ;

	if (shouldRotate(data.type)) {
		rotateOccupant(occ.id, getOppositeDirection(playerLocation.orientation));
	}

	if (data.type === 'PORTAL') {
		goToPosition(data.portal);
		return;
	}
	if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
		addMultipleMessages([
			{
				message: `Found ${data.amount} ${data.item}`,
				onRemoval: () => handleThisOccupant(occ),
				needsNoConfirmation: true,
			},
		]);
		return;
	}
	if (data.type === 'BUSH' && !handledOccupants.includes(occ.id)) {
		if (cutterPokemon) {
			addMultipleMessages([
				{
					message: `Your Pokemon used cut`,
					onRemoval: () => handleThisOccupant(occ),
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
				needsNoConfirmation: true,
				onRemoval: () => openStorage(stepsTaken),
			},
		]);
		return;
	}
	if (
		data.type === 'SIGN' &&
		playerLocation.orientation === data.approachDirection
	) {
		addMultipleMessages(
			data.dialogue.map((d) => ({ message: d, needsNoConfirmation: true }))
		);

		return;
	}
	if (data.type === 'MERCHANT') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToMarket(data.inventory, stepsTaken)
						: undefined,
				needsNoConfirmation: true,
			}))
		);

		return;
	}
	if (data.type === 'CAMP_MANAGER') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1 ? () => goToCampMenu() : undefined,
				needsNoConfirmation: true,
			}))
		);

		return;
	}
	if (data.type === 'NURSE') {
		addMultipleMessages([
			...data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => talkToNurse(occ.id)
						: undefined,
				needsNoConfirmation: true,
			})),
			{ message: 'Whole Team fully healed', needsNoConfirmation: true },
		]);

		return;
	}
	if (data.type === 'NPC') {
		if (!handledOccupants.includes(occ.id)) {
			addMultipleMessages(
				[
					...data.unhandledMessage.map((d, i) => ({
						message: d,
						onRemoval:
							i === data.unhandledMessage.length - 1
								? () => handleThisOccupant(occ)
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
							? () => handleThisOccupant(occ)
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

	if (data.type === 'HONEY_TREE') {
		interactWithHoneyTree();
		return;
	}

	console.error('what is this occupant', occ);
};
