import { getOppositeDirection } from '../../../functions/getOppositeDirection';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Inventory } from '../../../interfaces/Inventory';
import { Occupant } from '../../../interfaces/OverworldMap';
import { CharacterLocationData } from '../../../interfaces/SaveFile';
import { Dialogue } from '../Overworld';

export const interactWithFunction = ({
	occ,
	addDialogue,
	openStorage,
	stepsTaken,
	changeOccupant,
	playerLocation,
	goToMarket,
	talkToNurse,
	handledOccupants,
	handleThisOccupant,
	cutterPokemon,
}: {
	occ: [string, Occupant] | undefined;
	addDialogue: (x: Dialogue) => void;
	cutterPokemon?: { dexId: number };
	openStorage: (stepsTaken: number) => void;
	stepsTaken: number;
	changeOccupant: (id: number, updatedOccupant: Occupant) => void;
	playerLocation: CharacterLocationData;
	goToMarket: (marketInventory: Partial<Inventory>, stepsTaken: number) => void;
	talkToNurse: (id: number) => void;
	handleThisOccupant: (id: number) => void;
	handledOccupants: number[];
}) => {
	if (!occ) {
		return;
	}
	const [id, data] = occ;

	if (data.type === 'ITEM' || data.type === 'HIDDEN_ITEM') {
		addDialogue({
			message: `Found ${data.amount} ${data.item}`,
			onRemoval: () => handleThisOccupant(Number.parseInt(id)),
		});
		return;
	}
	if (data.type === 'BUSH' && !handledOccupants.includes(Number.parseInt(id))) {
		if (cutterPokemon) {
			addDialogue({
				message: `Your Pokemon used cut`,
				icon: <img src={getPokemonSprite(cutterPokemon.dexId)} />,
				onRemoval: () => handleThisOccupant(Number.parseInt(id)),
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
		});

		if (
			!handledOccupants.includes(Number.parseInt(id)) ||
			!data.handledDialogue
		) {
			data.unhandledDialogue.forEach((d) =>
				addDialogue({
					message: d,
				})
			);

			handleThisOccupant(Number.parseInt(id));
		} else {
			data.handledDialogue.forEach((d) =>
				addDialogue({
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
			!data.handledDialogue
		) {
			data.unhandledDialogue.forEach((d) =>
				addDialogue({
					message: d,
				})
			);

			handleThisOccupant(Number.parseInt(id));
		} else {
			data.handledDialogue.forEach((d) =>
				addDialogue({
					message: d,
				})
			);
		}

		return;
	}

	console.error('what is this occupant', occ);
};
