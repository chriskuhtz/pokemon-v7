import {
	BattleLocation,
	determineCaptureSuccess,
} from '../../../../../functions/determineCaptureSuccess';
import { Message } from '../../../../../hooks/useMessageQueue';
import { CatchProcessInfo } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { ItemType } from '../../../../../interfaces/Item';
import { Pokedex } from '../../../../../interfaces/SaveFile';

export const handleCatch = (
	pokemon: BattlePokemon[],
	attacker: BattlePokemon,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	move: CatchProcessInfo,
	addMultipleMessages: (x: Message[]) => void,
	battleRound: number,
	battleLocation: BattleLocation,
	addUsedItem: (x: ItemType) => void,
	pokedex: Pokedex
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
	const caughtBefore = pokedex[target.name].caughtOnRoutes.length > 0;
	const check1 = determineCaptureSuccess(
		move.ball,
		target,
		battleRound,
		battleLocation,
		caughtBefore
	);
	const check2 = determineCaptureSuccess(
		move.ball,
		target,
		battleRound,
		battleLocation,
		caughtBefore
	);
	const check3 = determineCaptureSuccess(
		move.ball,
		target,
		battleRound,
		battleLocation,
		caughtBefore
	);

	const getCatchStepMessage = (step: 1 | 2 | 3): Message => {
		const m = `${Array.from({ length: step })
			.map(() => 'wiggle')
			.join('...')}...`;

		return {
			message:
				step === 1 ? `You throw a ${move.ball} at ${target.data.name}` : m,
			onRemoval: () =>
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === attacker.id) {
							return { ...p, moveQueue: [] };
						}
						if (p.id === target.id) {
							return {
								...p,

								status: `CATCHING_${step}`,
								ball: move.ball,
							};
						}

						return p;
					})
				),
		};
	};

	addMultipleMessages(
		[
			getCatchStepMessage(1),
			check1 ? getCatchStepMessage(2) : undefined,
			check1 && check2 ? getCatchStepMessage(3) : undefined,
			check1 && check2 && check3
				? {
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
				  }
				: {
						message: `${target.data.name} broke free`,
						onRemoval: () =>
							setPokemon((pokemon) =>
								pokemon.map((p) => {
									if (p.id === attacker.id) {
										return { ...p, moveQueue: [] };
									}
									if (p.id === target.id) {
										return {
											...p,
											status: 'ONFIELD',
										};
									}

									return p;
								})
							),
				  },
		].filter((m) => m !== undefined)
	);

	return;
};
