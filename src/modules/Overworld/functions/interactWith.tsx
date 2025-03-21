import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { Message } from '../../../hooks/useMessageQueue';
import { Inventory } from '../../../interfaces/Inventory';
import { getRandomItem } from '../../../interfaces/Item';
import {
	Ledge,
	Occupant,
	OccupantType,
	OverworldBush,
} from '../../../interfaces/OverworldMap';
import {
	CharacterLocationData,
	CharacterOrientation,
	SettingsObject,
} from '../../../interfaces/SaveFile';

export const shouldRotate = (t: OccupantType) =>
	[
		'NURSE',
		'NPC',
		'MERCHANT',
		'CAMP_MANAGER',
		'TRAINER',
		'APRICORN_SMITH',
		'TRAINING_FIELD_MASTER',
		'BERRY_FARMER',
		'MILTANK_FARMER',
		'POKEMON',
		'ZIGZAGOON_FORAGER',
	].includes(t);
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
	goToPosition,
	interactWithHoneyTree,
	interactWithCombeeHive,
	interactWithHallowedTower,
	interactWithBush,
	interactWithLedge,
	interactWithZigzagoonForager,
	goToCampMenu,
	goToBulletinBoard,
	goToApricornSmith,
	goToTrainingField,
	goToBerryFarm,
	goToMiltankFarm,
	settings,
}: {
	occ: Occupant | undefined;
	addMultipleMessages: (x: Message[]) => void;
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
	interactWithHallowedTower: () => void;
	interactWithCombeeHive: () => void;
	interactWithBush: (x: OverworldBush) => void;
	interactWithLedge: (x: Ledge) => void;
	interactWithZigzagoonForager: () => void;
	goToCampMenu: () => void;
	goToBulletinBoard: () => void;
	goToApricornSmith: () => void;
	goToTrainingField: () => void;
	goToBerryFarm: () => void;
	goToMiltankFarm: () => void;
	settings?: SettingsObject;
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
		const checkedData = settings?.randomOverworldItems
			? { ...data, item: getRandomItem() }
			: data;
		addMultipleMessages([
			{
				message: `Found ${data.amount} ${checkedData.item}`,
				onRemoval: () => handleThisOccupant(checkedData),
				needsNoConfirmation: true,
			},
		]);
		return;
	}
	if (data.type === 'BUSH') {
		interactWithBush(data);
		return;
	}
	if (data.type === 'LEDGE') {
		interactWithLedge(data);
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
	if (data.type === 'BERRY_FARMER') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1 ? () => goToBerryFarm() : undefined,
				needsNoConfirmation: true,
			}))
		);

		return;
	}
	if (data.type === 'MILTANK_FARMER') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1 ? () => goToMiltankFarm() : undefined,
				needsNoConfirmation: true,
			}))
		);

		return;
	}
	if (data.type === 'APRICORN_SMITH') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToApricornSmith()
						: undefined,
				needsNoConfirmation: true,
			}))
		);

		return;
	}
	if (data.type === 'BULLETIN_BOARD') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToBulletinBoard()
						: undefined,
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
	if (data.type === 'POKEMON') {
		addMultipleMessages([
			...data.dialogue.map((d) => ({
				message: d,
			})),
		]);

		return;
	}
	if (data.type === 'ZIGZAGOON_FORAGER') {
		interactWithZigzagoonForager();
		return;
	}
	if (data.type === 'TRAINER') {
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
	if (data.type === 'TRAINING_FIELD_MASTER') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToTrainingField()
						: undefined,
			}))
		);
		return;
	}
	if (data.type === 'HONEY_TREE') {
		interactWithHoneyTree();
		return;
	}
	if (data.type === 'HALLOWED_TOWER') {
		interactWithHallowedTower();
		return;
	}
	if (data.type === 'COMBEE_HIVE') {
		interactWithCombeeHive();
		return;
	}

	console.error('what is this occupant', occ);
};
