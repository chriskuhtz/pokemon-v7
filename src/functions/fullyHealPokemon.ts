import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const fullyHealPokemon = (p: OwnedPokemon): OwnedPokemon => {
	return {
		...p,
		damage: 0,
		primaryAilment: undefined,
		firstMove: { ...p.firstMove, usedPP: 0 },
		secondMove: p.secondMove ? { ...p.secondMove, usedPP: 0 } : undefined,
		thirdMove: p.thirdMove ? { ...p.thirdMove, usedPP: 0 } : undefined,
		fourthMove: p.fourthMove ? { ...p.fourthMove, usedPP: 0 } : undefined,
	};
};
