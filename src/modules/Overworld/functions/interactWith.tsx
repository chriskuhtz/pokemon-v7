import { SpriteIcon } from '../../../components/SpriteIcon/SpriteIcon';
import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { Message } from '../../../hooks/useMessageQueue';
import { getRandomItem } from '../../../interfaces/Item';
import {
	ApricornTree,
	Ledge,
	Occupant,
	OccupantType,
	OverworldBush,
	OverworldPokemon,
	OverworldRock,
	OverworldSnorlax,
	OverworldStrangeTree,
	OverworldTrainer,
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
		'TELEPORTER_NPC',
	].includes(t);
export const interactWithFunction = ({
	activeMessage,
	occ,
	addMultipleMessages,
	rotateOccupant,
	playerLocation,
	talkToNurse,
	handledOccupants,
	handleThisOccupant,
	goToPosition,
	interactWithHoneyTree,
	interactWithCombeeHive,
	interactWithStrangeTree,
	interactWithHallowedTower,
	interactWithBush,
	interactWithRock,
	interactWithClimbingSteps,
	interactWithLedge,
	interactWithZigzagoonForager,
	interactWithDugtrioExplorer,
	interactWithSwarmRadar,
	interactWithRocketRadio,
	interactWithSnorlax,
	interactWithTrainer,
	interactWithStaticEncounter,
	interactWithApricornTree,
	settings,
	goTo,
}: {
	activeMessage: boolean;
	occ: Occupant | undefined;
	addMultipleMessages: (x: Message[]) => void;
	rotateOccupant: (id: string, newOrientation: CharacterOrientation) => void;
	playerLocation: CharacterLocationData;
	talkToNurse: (id: string) => void;
	handleThisOccupant: (occ: Occupant) => void;
	handledOccupants: string[];
	goToPosition: (x: CharacterLocationData) => void;
	interactWithHoneyTree: () => void;
	interactWithHallowedTower: () => void;
	interactWithStrangeTree: (x: OverworldStrangeTree) => void;
	interactWithCombeeHive: () => void;
	interactWithBush: (x: OverworldBush) => void;
	interactWithRock: (x: OverworldRock) => void;
	interactWithClimbingSteps: () => void;
	interactWithTrainer: (x: OverworldTrainer) => void;
	interactWithLedge: (x: Ledge) => void;
	interactWithSnorlax: (x: OverworldSnorlax) => void;
	interactWithStaticEncounter: (x: OverworldPokemon) => void;
	interactWithApricornTree: (x: ApricornTree) => void;
	interactWithZigzagoonForager: () => void;
	interactWithDugtrioExplorer: () => void;
	interactWithSwarmRadar: () => void;
	interactWithRocketRadio: () => void;
	goTo: (route: RoutesType) => void;
	settings?: SettingsObject;
}) => {
	if (!occ || activeMessage) {
		return;
	}

	const data = occ;

	if (shouldRotate(data.type)) {
		rotateOccupant(occ.id, getOppositeDirection(playerLocation.orientation));
	}
	if (data.type === 'TELEPORTER_NPC') {
		addMultipleMessages([
			...data.dialogue.map((d, i) => ({
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => goToPosition(data.to)
						: undefined,
			})),
		]);
		return;
	}
	if (data.type === 'APRICORN_TREE') {
		interactWithApricornTree(data);
		return;
	}

	if (data.type === 'EMPTY_APRICORN_TREE') {
		addMultipleMessages([
			{ message: 'The Apricorns will need some time to grow' },
		]);
		return;
	}
	if (data.type === 'SNORLAX') {
		interactWithSnorlax(data);
	}
	if (data.type === 'BERRY_LURE') {
		addMultipleMessages([
			{
				message: 'Inspecting the berry lure',
				needsNoConfirmation: true,
				onRemoval: () => goTo('BERRY_LURE'),
			},
		]);
		return;
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

		handleThisOccupant(checkedData);

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
	if (data.type === 'CLIMBING_STEPS') {
		interactWithClimbingSteps();
		return;
	}
	if (data.type === 'LEDGE') {
		interactWithLedge(data);
		return;
	}
	if (data.type === 'PC') {
		addMultipleMessages([
			{
				message: 'Accessing Pokemon Storage',
				needsNoConfirmation: true,
				onRemoval: () => goTo('STORAGE'),
			},
		]);
		return;
	}
	if (data.type === 'STORAGE_CHEST') {
		addMultipleMessages([
			{
				message: 'Opening Your Storage Chest',
				needsNoConfirmation: true,
				onRemoval: () => goTo('STORAGE_CHEST'),
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
	if (data.type === 'ROUTER_NPC') {
		addMultipleMessages(
			data.dialogue.map((d, i) => ({
				icon: <SpriteIcon sprite={data.sprite} />,
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
				icon: <SpriteIcon sprite={data.sprite} />,
				message: d,
				onRemoval:
					i === data.dialogue.length - 1
						? () => talkToNurse(occ.id)
						: undefined,
				needsNoConfirmation: true,
			})),
			{
				icon: <SpriteIcon sprite={data.sprite} />,
				message: 'Whole Team fully healed',
				needsNoConfirmation: true,
			},
		]);

		return;
	}
	if (data.type === 'NPC') {
		if (!handledOccupants.includes(occ.id)) {
			addMultipleMessages(
				[
					...data.unhandledMessage.map((d, i) => ({
						icon: <SpriteIcon sprite={data.sprite} />,
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
					icon: <SpriteIcon sprite={data.sprite} />,
					message: d,
				}))
			);
		}

		return;
	}
	if (data.type === 'POKEMON') {
		if (data.encounter) {
			interactWithStaticEncounter(data);
		} else
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
	if (data.type === 'ROCKET_RADIO') {
		interactWithRocketRadio();
		return;
	}
	if (data.type === 'TRAINER') {
		interactWithTrainer(data);
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
	if (data.type === 'STRANGE_TREE') {
		interactWithStrangeTree(data);
		return;
	}
	if (data.type === 'COMBEE_HIVE') {
		interactWithCombeeHive();
		return;
	}

	console.error('what is this occupant', occ);
};
