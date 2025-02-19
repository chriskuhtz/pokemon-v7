import {
	BattleLocation,
	determineCaptureSuccess,
} from '../../../../../functions/determineCaptureSuccess';
import { CatchProcessInfo } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { ItemType } from '../../../../../interfaces/Item';
import { BattleMessage } from '../../../BattleField';

export const handleCatch = (
	pokemon: BattlePokemon[],
	attacker: BattlePokemon,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	move: CatchProcessInfo,
	addMultipleMessages: (x: BattleMessage[]) => void,
	battleRound: number,
	battleLocation: BattleLocation,
	interjectMessage: (x: BattleMessage) => void,
	addUsedItem: (x: ItemType) => void
) => {
	const target = pokemon.find(
		(p) => p.id === move.targetId && p.status === 'ONFIELD'
	);
	addUsedItem(move.ball);
	if (!target) {
		addMultipleMessages([
			{
				message: `You throw a ${move.ball}`,
			},
			{
				message: `but there is no target`,
				onRemoval: () =>
					setPokemon((pokemon) =>
						pokemon.map((p) => {
							if (p.id === attacker.id) {
								return { ...p, moveQueue: [] };
							}

							return p;
						})
					),
			},
		]);

		return;
	}

	const getCatchStepMessage = (step: 2 | 3): BattleMessage => ({
		message: Array.from({ length: step })
			.map(() => 'wiggle')
			.join('...'),
		onRemoval: () =>
			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === attacker.id) {
						return { ...p, moveQueue: [] };
					}
					if (p.id === target.id) {
						//TODO: make this a BattlePokemon property
						const caughtBefore = false;
						const continueProcess = determineCaptureSuccess(
							move.ball,
							target,
							battleRound,
							battleLocation,
							caughtBefore
						);

						if (continueProcess) {
							return {
								...p,

								status: `CATCHING_${step}`,
								ball: move.ball,
							};
						} else
							interjectMessage({
								message: `${target.data.name} broke free`,
								clearStackOnRemoval: true,
							});
						return {
							...p,
							status: 'ONFIELD',
						};
					}

					return p;
				})
			),
	});

	addMultipleMessages([
		{
			message: `You throw a ${move.ball} at ${target.data.name}`,
			onRemoval: () =>
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}
						if (p.id === target.id) {
							return {
								...p,
								status: 'CATCHING_1',
								ball: move.ball,
							};
						}

						return p;
					})
				),
		},
		getCatchStepMessage(2),
		getCatchStepMessage(3),
		{
			message: `${target.data.name} was caught`,
			onRemoval: () =>
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}
						if (p.id === target.id) {
							return {
								...p,
								moveQueue: [],
								status: 'CAUGHT',
								ball: move.ball,
							};
						}

						return p;
					})
				),
		},
	]);

	return;
};
