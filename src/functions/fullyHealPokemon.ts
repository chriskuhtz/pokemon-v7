import { OwnedPokemon } from "../interfaces/OwnedPokemon";

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

export const healPokemonBy = (p: OwnedPokemon, hp: number): OwnedPokemon => {
  return {
    ...p,
    damage: Math.max(p.damage - hp, 0),
  };
};
export const healPokemonByPercentage = (
  p: OwnedPokemon,
  percentage: number,
): OwnedPokemon => {
  return healPokemonBy(p, Math.ceil((p.maxHp * percentage) / 100));
};
export const healPrimaryAilment = (p: OwnedPokemon): OwnedPokemon => {
  return {
    ...p,
    primaryAilment: undefined,
  };
};
