import { CatchProcessInfo } from '../../../../../interfaces/BattleActions';
import { BattlePokemon } from '../../../../../interfaces/BattlePokemon';
import { BattleMessage } from '../../../BattleField';

export const handleCatch = (
	pokemon: BattlePokemon[],
	attacker: BattlePokemon,
	setPokemon: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
	move: CatchProcessInfo,
	addMultipleMessages: (x: BattleMessage[]) => void
) => {
	const target = pokemon.find(
		(p) => p.id === move.targetId && p.status === 'ONFIELD'
	);
	if (!target) {
		throw new Error('ther is no target to catch');
	}
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
								moveQueue: [],
								status: 'CATCHING_1',
								ball: move.ball,
							};
						}

						return p;
					})
				),
		},
		{
			message: 'wiggle',
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
								status: 'CATCHING_2',
								ball: move.ball,
							};
						}

						return p;
					})
				),
		},
		{
			message: 'woggle',
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
								status: 'CATCHING_3',
								ball: move.ball,
							};
						}

						return p;
					})
				),
		},
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
