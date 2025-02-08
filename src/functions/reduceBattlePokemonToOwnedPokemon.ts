import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const reduceBattlePokemonToOwnedPokemon = (
	newMon: BattlePokemon
): OwnedPokemon => {
	return {
		dexId: newMon.dexId,
		firstMove: { name: newMon.firstMove.name, usedPP: newMon.firstMove.usedPP },
		secondMove: newMon.secondMove
			? { name: newMon.secondMove.name, usedPP: newMon.secondMove.usedPP }
			: undefined,
		thirdMove: newMon.thirdMove
			? { name: newMon.thirdMove.name, usedPP: newMon.thirdMove.usedPP }
			: undefined,
		fourthMove: newMon.fourthMove
			? { name: newMon.fourthMove.name, usedPP: newMon.fourthMove.usedPP }
			: undefined,

		id: newMon.id,
		//TODO: persist damage? Only when healing/revive exists
		damage: 0,
		ball: newMon.ball,
		ownerId: newMon.ownerId,
		nature: newMon.nature,
		onTeam: newMon.onTeam,
		xp: newMon.xp,
		ability: newMon.ability,
	};
};
