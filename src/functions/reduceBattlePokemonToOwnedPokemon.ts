import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { BattlePokemon } from '../modules/Battle/hooks/useBattlePokemon';

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
	};
};
