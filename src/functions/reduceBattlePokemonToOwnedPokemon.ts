import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { fullyHealPokemon } from './fullyHealPokemon';

export const reduceBattlePokemonToOwnedPokemon = (
	newMon: BattlePokemon,
	heal?: boolean
): OwnedPokemon => {
	const res = {
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

		damage: newMon.damage,
		primaryAilment: newMon.primaryAilment,
		ball: newMon.ball,
		ownerId: newMon.ownerId,
		nature: newMon.nature,
		onTeam: newMon.onTeam,
		xp: newMon.xp,
		ability: newMon.ability,
		happiness: newMon.happiness,
		stepsWalked: newMon.stepsWalked,
	};

	if (heal) {
		return fullyHealPokemon(res);
	}

	return res;
};
