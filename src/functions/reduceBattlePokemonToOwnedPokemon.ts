import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { fullyHealPokemon } from './fullyHealPokemon';
import { persistentPrimaryAilment } from './persistentPrimaryAilment';

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
		primaryAilment: persistentPrimaryAilment(newMon.primaryAilment),
		ball: newMon.ball,
		ownerId: newMon.ownerId,
		nature: newMon.nature,
		onTeam: newMon.onTeam ?? false,
		xp: newMon.xp,
		ability: newMon.initAbility,
		happiness: newMon.happiness,
		stepsWalked: newMon.stepsWalked,
		heldItemName: newMon.heldItemName,
		maxHp: newMon.stats.hp,
		effortValues: newMon.effortValues,
		ppBoostedMoves: newMon.ppBoostedMoves,
		caughtOnMap: newMon.caughtOnMap,
	};

	if (heal) {
		return fullyHealPokemon(res);
	}

	return res;
};
