import { useCallback, useContext, useMemo } from 'react';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { calculateLevelData } from '../functions/calculateLevelData';
import { getRandomEntry } from '../functions/filterTargets';
import { getHeldItem } from '../functions/getHeldItem';
import { isKO } from '../functions/isKo';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../interfaces/Inventory';
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
					saveFile.settings?.rogueLike ||
					saveFile.settings?.releaseFaintedPokemon
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
					});
					return;
				}
			}

			const configCheckedTeam = updatedTeam.filter((p) => {
				if (saveFile.settings?.releaseFaintedPokemon && isKO(p)) {
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
					const lvl = calculateLevelData(p.xp).level;
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

			const pokedex = { ...saveFile.pokedex };
			caughtPokemon.forEach((p) =>
				addPokemonToDex(pokedex, p.name, p.caughtOnMap, true)
			);

			patchSaveFileReducer({
				bag: joinInventories(updatedInventory, rewardItems ?? {}),
				money: saveFile.money + scatteredCoins,
				pokemon: updatedPokemon,
				meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
				researchPoints: saveFile.researchPoints + gainedResearchPoints(),
				handledOccupants:
					defeatedChallengerId && !alreadyDefeated
						? [
								...saveFile.handledOccupants,
								{ id: defeatedChallengerId, resetAt: -1 },
						  ]
						: saveFile.handledOccupants,
				mileStones: {
					...saveFile.mileStones,
					hasCaughtASwarmPokemon:
						saveFile.currentSwarm &&
						caughtPokemon.some((c) => c.name === saveFile.currentSwarm?.pokemon)
							? true
							: saveFile.mileStones.hasCaughtASwarmPokemon,
				},
				pokedex,
			});
		},
		[patchSaveFileReducer, reset, saveFile, team]
	);
};
