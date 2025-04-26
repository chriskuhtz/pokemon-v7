import { useCallback, useContext, useMemo } from 'react';
import { challengeFieldOccupants } from '../constants/maps/occupants/challengeField';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { calculateLevelData } from '../functions/calculateLevelData';
import { getRandomEntry } from '../functions/filterTargets';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { getHeldItem } from '../functions/getHeldItem';
import { isKO } from '../functions/isKo';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../interfaces/Inventory';
import { pickupTable } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { SaveFileContext } from './useSaveFile';

export interface LeaveBattlePayload {
	caughtPokemon: BattlePokemon[];
	updatedInventory: Inventory;
	scatteredCoins: number;
	team: BattlePokemon[];
	outcome: 'WIN' | 'LOSS' | 'DRAW';
	defeatedPokemon: BattlePokemon[];
	defeatedChallengerId?: string;
	rewardItems?: Partial<Inventory>;
}
export const useLeaveBattle = () => {
	const { patchSaveFileReducer, saveFile, reset } = useContext(SaveFileContext);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	return useCallback(
		({
			team: updatedTeam,
			updatedInventory,
			caughtPokemon,
			scatteredCoins,
			outcome,
			defeatedChallengerId,
			rewardItems,
		}: LeaveBattlePayload) => {
			let updatedLocation = saveFile.location;

			if (outcome === 'LOSS') {
				if (
					saveFile.location.mapId !== 'camp' &&
					saveFile.location.mapId !== 'challengeField' &&
					(saveFile.settings?.rogueLike ||
						saveFile.settings?.releaseFaintedPokemon)
				) {
					reset();
					return;
				} else {
					updatedLocation = {
						mapId: 'camp',
						x: 1,
						y: 1,
						orientation: 'DOWN',
						forwardFoot: 'CENTER1',
					};

					patchSaveFileReducer({
						meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
						location: updatedLocation,
						pokemon: saveFile.pokemon.map((p) => {
							if (p.onTeam) {
								return fullyHealPokemon(p);
							}
							return p;
						}),
						bag:
							saveFile.location.mapId === 'camp'
								? saveFile.bag
								: EmptyInventory,
					});
					return;
				}
			}

			const configCheckedTeam = updatedTeam.filter((p) => {
				//pokemon that faint on training field are not released
				if (
					saveFile.settings?.releaseFaintedPokemon &&
					isKO(p) &&
					saveFile.location.mapId !== 'camp'
				) {
					return false;
				}

				return true;
			});

			const ownedTeam = configCheckedTeam.map((p) =>
				reduceBattlePokemonToOwnedPokemon(p)
			);

			//check pickup
			const pickUpCheckedTeam: OwnedPokemon[] = ownedTeam.map((p) => {
				if (p.ability === 'pickup' && !getHeldItem(p) && Math.random() < 0.1) {
					return { ...p, heldItemName: getRandomEntry(pickupTable) };
				}
				if (p.ability === 'honey-gather' && !getHeldItem(p)) {
					const lvl = calculateLevelData(p.xp, p.growthRate).level;
					const chance = 0.05 + lvl * 0.0045;
					if (Math.random() < chance) {
						return { ...p, heldItemName: 'honey' };
					}
				}

				return p;
			});

			const teamAndCaught = [
				...pickUpCheckedTeam,
				...caughtPokemon.map((c) => ({
					...reduceBattlePokemonToOwnedPokemon(
						{ ...c, ownerId: saveFile.playerId },
						c.ball === 'heal-ball'
					),
					caughtAtDate: new Date().getTime(),
					caughtOnMap: saveFile.location.mapId,
				})),
			].map((t, i) => ({ ...t, onTeam: i < 6 }));

			const updatedPokemon = [
				...teamAndCaught,
				...saveFile.pokemon.filter((p) => !team.some((t) => t.id === p.id)),
			];

			const alreadyDefeated = saveFile.handledOccupants.some(
				(h) => h.id === defeatedChallengerId
			);
			const gainedResearchPoints = () => {
				if (saveFile.location.mapId === 'challengeField') {
					return 0;
				}
				if (outcome !== 'WIN') {
					return 0;
				}
				if (!defeatedChallengerId) {
					return 0;
				}
				if (alreadyDefeated) {
					return 0;
				}

				return 1;
			};

			let updatedSwarmRecord = [...saveFile.mileStones.caughtFromSwarms];

			caughtPokemon.forEach((c) => {
				if (
					saveFile.currentSwarm &&
					c.name === saveFile.currentSwarm?.pokemon
				) {
					updatedSwarmRecord.push(c.name);
				}
			});
			updatedSwarmRecord = [...new Set(updatedSwarmRecord)];

			const pokedex = { ...saveFile.pokedex };
			caughtPokemon.forEach((p) =>
				addPokemonToDex(pokedex, p.name, p.caughtOnMap, true)
			);

			const challengeFieldRank = challengeFieldOccupants
				.filter((t) => t.type === 'TRAINER')
				.find((c) => c.id === defeatedChallengerId)?.challengeFieldRank;

			const updatedMileStones = { ...saveFile.mileStones };

			if (challengeFieldRank !== undefined) {
				if (!updatedMileStones.challengeFieldRecord) {
					updatedMileStones.challengeFieldRecord = challengeFieldRank;
				}
				if (challengeFieldRank > updatedMileStones.challengeFieldRecord) {
					updatedMileStones.challengeFieldRecord = challengeFieldRank;
				}
			}
			updatedMileStones.caughtFromSwarms = updatedSwarmRecord;

			patchSaveFileReducer({
				bag: joinInventories(updatedInventory, rewardItems ?? {}),
				money: saveFile.money + scatteredCoins,
				pokemon: updatedPokemon,
				meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
				researchPoints: saveFile.researchPoints + gainedResearchPoints(),
				handledOccupants: defeatedChallengerId
					? [
							...saveFile.handledOccupants,
							{ id: defeatedChallengerId, resetAt: -1 },
					  ]
					: saveFile.handledOccupants,
				mileStones: updatedMileStones,
				pokedex,
			});
		},
		[patchSaveFileReducer, reset, saveFile, team]
	);
};
