import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { Message } from '../../../hooks/useMessageQueue';
import { Inventory } from '../../../interfaces/Inventory';
import { getRandomItem } from '../../../interfaces/Item';
import {
	Ledge,
	Occupant,
	OccupantType,
	OverworldBush,
	OverworldRock,
} from '../../../interfaces/OverworldMap';
import { RoutesType } from '../../../interfaces/Routing';
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
		'DUGTRIO_EXPLORER',
		'ROUTER_NPC',
	].includes(t);
export const interactWithFunction = ({
	occ,
	addMultipleMessages,
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
	interactWithRock,
	interactWithLedge,
	interactWithZigzagoonForager,
	interactWithDugtrioExplorer,
	interactWithSwarmRadar,
	settings,
	goTo,
}: {
	occ: Occupant | undefined;
	addMultipleMessages: (x: Message[]) => void;
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
	interactWithRock: (x: OverworldRock) => void;
	interactWithLedge: (x: Ledge) => void;
	interactWithZigzagoonForager: () => void;
	interactWithDugtrioExplorer: () => void;
	interactWithSwarmRadar: () => void;

	goTo: (route: RoutesType) => void;
	settings?: SettingsObject;
}) => {
	if (!occ) {
		return;
	}
	const data = occ;

	if (shouldRotate(data.type)) {
		rotateOccupant(occ.id, getOppositeDirection(playerLocation.orientation));
	}
	if (data.type === 'ON_STEP_PORTAL') {
		return;
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
	if (data.type === 'ROCK') {
		interactWithRock(data);
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
				onRemoval: () => goTo('STORAGE'),
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
	if (data.type === 'ROUTER_NPC') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1 ? () => goTo(data.to) : undefined,
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
						? () => goTo('BULLETIN_BOARD')
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
	if (data.type === 'DUGTRIO_EXPLORER') {
		interactWithDugtrioExplorer();
		return;
	}
	if (data.type === 'SWARM_RADAR') {
		interactWithSwarmRadar();
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
