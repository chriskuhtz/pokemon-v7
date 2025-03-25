import { useCallback, useContext, useMemo } from 'react';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { getRandomEntry } from '../functions/filterTargets';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../interfaces/Inventory';
import { pickupTable } from '../interfaces/Item';
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
				if (saveFile.settings?.rogueLike) {
					reset();
					return;
				} else {
					updatedLocation = {
						mapId: 'camp',
						x: 6,
						y: 5,
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

			const ownedTeam = updatedTeam.map((p) =>
				reduceBattlePokemonToOwnedPokemon(p)
			);

			//check pickup
			const pickUpCheckedTeam = ownedTeam.map((p) => {
				if (p.ability === 'pickup' && !p.heldItemName && Math.random() < 0.1) {
					return { ...p, heldItemName: getRandomEntry(pickupTable) };
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
				inventory: joinInventories(updatedInventory, rewardItems ?? {}),
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
