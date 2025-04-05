import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { fullyHealPokemon } from './fullyHealPokemon';
import { persistentPrimaryAilment } from './persistentPrimaryAilment';

export const reduceBattlePokemonToOwnedPokemon = (
	newMon: BattlePokemon,
	heal?: boolean
): OwnedPokemon => {
	const res = {
		name: newMon.name,
		gender: newMon.gender,
		firstMove: {
			name: newMon.putMimicbacktoSlot === 0 ? 'mimic' : newMon.firstMove.name,
			usedPP: newMon.firstMove.usedPP,
		},
		secondMove: newMon.secondMove
			? {
					name:
						newMon.putMimicbacktoSlot === 1 ? 'mimic' : newMon.secondMove.name,
					usedPP: newMon.secondMove.usedPP,
			  }
			: undefined,
		thirdMove: newMon.thirdMove
			? {
					name:
						newMon.putMimicbacktoSlot === 2 ? 'mimic' : newMon.thirdMove.name,
					usedPP: newMon.thirdMove.usedPP,
			  }
			: undefined,
		fourthMove: newMon.fourthMove
			? {
					name:
						newMon.putMimicbacktoSlot === 3 ? 'mimic' : newMon.fourthMove.name,
					usedPP: newMon.fourthMove.usedPP,
			  }
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
		weightModifier: newMon.weightModifier ?? Math.random(),
		heightModifier: newMon.heightModifier ?? Math.random(),
		intrinsicValues: newMon.intrinsicValues,
		shiny: newMon.shiny,
		unlockedMoves: newMon.unlockedMoves,
	};

	if (heal) {
		return fullyHealPokemon(res);
	}

	return res;
};
