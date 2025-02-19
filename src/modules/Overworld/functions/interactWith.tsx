import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Inventory } from '../../../interfaces/Inventory';
import { Occupant, OverworldItem } from '../../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../../interfaces/SaveFile';
import { Dialogue } from '../Overworld';

export const interactWithFunction = ({
	occ,
	addDialogue,
	collectItem,
	cutBushes,
	bushCutting,
	openStorage,
	stepsTaken,
	changeOccupant,
	playerLocation,
	goToMarket,
	talkToNurse,
}: {
	occ: [string, Occupant] | undefined;
	addDialogue: (x: Dialogue) => void;
	collectItem: (item: [string, OverworldItem]) => void;
	cutBushes: number[];
	bushCutting?: {
		cut: (id: number) => void;
		cutterPokemon: { dexId: number };
	};
	openStorage: (stepsTaken: number) => void;
	stepsTaken: number;
	changeOccupant: (id: number, updatedOccupant: Occupant) => void;
	playerLocation: CharacterLocationData;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: number) => void;
}) => {
	if (!occ) {
		return;
	}
	const [id, data] = occ;

	if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
		addDialogue({
			message: `Found ${data.amount} ${data.item}`,
			onRemoval: () => collectItem(occ as [string, OverworldItem]),
		});
		return;
	}
	if (data.type === 'BUSH' && !cutBushes.includes(Number.parseInt(id))) {
		if (bushCutting) {
			addDialogue({
				message: `Your Pokemon used cut`,
				icon: <img src={getPokemonSprite(bushCutting.cutterPokemon.dexId)} />,
				onRemoval: () => bushCutting.cut(Number.parseInt(id)),
			});
		} else addDialogue({ message: 'Maybe a Pokemon can cut this' });
		return;
	}
	if (
		data.type === 'PC' &&
		playerLocation.orientation === data.approachDirection
	) {
		addDialogue({
			message: 'Accessing Pokemon Storage',
			onRemoval: () => openStorage(stepsTaken),
		});
		return;
	}
	if (data.type === 'MERCHANT') {
		changeOccupant(Number.parseInt(id), {
			...data,
			orientation: getOppositeDirection(playerLocation.orientation),
		});
		data.dialogue.forEach((d, i) =>
			addDialogue({
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
			addDialogue({
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
			rotating: false,
		});

		data.dialogue.forEach((d) =>
			addDialogue({
				message: d,
			})
		);
		return;
	}

	console.error('what is this occupant', occ);
};
