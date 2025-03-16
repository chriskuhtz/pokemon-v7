import { Challenger } from '../interfaces/Challenger';
import { EmptyInventory } from '../interfaces/Inventory';
import { SpriteEnum } from '../interfaces/SpriteEnum';
import { makeChallengerPokemon } from './makeChallengerPokemon';

export const makeRandomTrainer = (): Challenger => {
	return {
		type: 'TRAINER',
		id: 'random_trainer',
		team: [
			makeChallengerPokemon({ name: 'caterpie', xp: 100 }),
			makeChallengerPokemon({ name: 'weedle', xp: 100 }),
		],
		inventory: EmptyInventory,
		trainer: { name: 'Bug Catcher Bob', sprite: SpriteEnum.bugCatcher },
	};
};
