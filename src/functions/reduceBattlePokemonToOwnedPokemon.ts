import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const reduceBattlePokemonToOwnedPokemon = (
	newMon: BattlePokemon
): OwnedPokemon => {
	return {
		dexId: newMon.dexId,
		firstMove: { name: newMon.firstMove.name, usedPP: newMon.firstMove.usedPP },
		id: newMon.id,
		damage: newMon.damage,
		ball: newMon.ball,
		ownerId: newMon.ownerId,
		nature: newMon.nature,
		onTeam: newMon.onTeam,
		xp: newMon.xp,
		ability: newMon.ability,
	};
};
