import { useCallback, useContext, useMemo } from 'react';
import { ONE_HOUR, randomFieldId } from '../constants/gameData';
import { barryId } from '../constants/maps/occupants/barry';
import { challengeFieldOccupants } from '../constants/maps/occupants/challengeField';
import { cynthiaId } from '../constants/maps/occupants/cynthia';
import { hughId } from '../constants/maps/occupants/hugh';
import { nId } from '../constants/maps/occupants/n';
import { redId } from '../constants/maps/occupants/red';
import { silverId } from '../constants/maps/occupants/silver';
import { addPokemonToDex } from '../functions/addPokemonToDex';
import { calculateLevelData } from '../functions/calculateLevelData';
import { getRandomEntry } from '../functions/filterTargets';
import { fullyHealPokemon } from '../functions/fullyHealPokemon';
import { getHeldItem } from '../functions/getHeldItem';
import { getHighestXpOnTeam } from '../functions/getHighestXpOnTeam';
import { getTeamSize } from '../functions/getTeamSize';
import { isKO } from '../functions/isKo';
import { reduceBattlePokemonToOwnedPokemon } from '../functions/reduceBattlePokemonToOwnedPokemon';
import { resetChallengeFielders } from '../functions/resetChallengeFielders';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EmptyInventory,
	Inventory,
	joinInventories,
} from '../interfaces/Inventory';
import { isKeyItem, pickupTable } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { CatchStreak } from '../interfaces/SaveFile';
import { LocationContext } from './LocationProvider';
import { useReset } from './useReset';
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
	const { location, setLocation } = useContext(LocationContext);
	const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
	const reset = useReset();

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const handleLoss = useCallback(() => {
		let updatedLocation = location;

		const resetTime = () => {
			if (
				saveFile.settings?.rogueLike ||
				saveFile.settings?.releaseFaintedPokemon
			) {
				return (
					//dont reset on challenge field and camp
					location.mapId !== 'camp' &&
					location.mapId !== 'challengeField' &&
					location.mapId !== 'randomField'
				);
			}
			return false;
		};
		if (resetTime()) {
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

			//key items dont get lost
			const bagWithOnlyKeyItems = joinInventories(
				EmptyInventory,
				Object.fromEntries(
					Object.entries(saveFile.bag).filter(([item]) => isKeyItem(item))
				)
			);

			setLocation(updatedLocation);
			patchSaveFileReducer({
				meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
				pokemon: saveFile.pokemon.map((p) => {
					if (p.onTeam) {
						return fullyHealPokemon(p);
					}
					return p;
				}),
				handledOccupants: resetChallengeFielders(saveFile.handledOccupants),
				bag: location.mapId === 'camp' ? saveFile.bag : bagWithOnlyKeyItems,
			});
			return;
		}
	}, [location, patchSaveFileReducer, reset, saveFile, setLocation]);
	const handleWin = useCallback(
		({
			team: updatedTeam,
			updatedInventory,
			caughtPokemon,
			scatteredCoins,
			outcome,
			defeatedChallengerId,
			rewardItems,
		}: LeaveBattlePayload) => {
			const configCheckedTeam = updatedTeam.filter((p) => {
				//pokemon that faint on training field are not released
				if (
					saveFile.settings?.releaseFaintedPokemon &&
					isKO(p) &&
					location.mapId !== 'camp'
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
					caughtOnMap: location.mapId,
				})),
			].map((t, i) => ({ ...t, onTeam: i < getTeamSize(saveFile) }));

			const updatedPokemon = [
				...teamAndCaught,
				...saveFile.pokemon.filter((p) => !team.some((t) => t.id === p.id)),
			];

			const alreadyDefeated = saveFile.handledOccupants.some(
				(h) => h.id === defeatedChallengerId
			);
			const gainedResearchPoints = () => {
				if (location.mapId === 'challengeField') {
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
			let updatedCatchStreak: CatchStreak | undefined = saveFile.catchStreak;

			caughtPokemon.forEach((c) => {
				if (
					saveFile.currentSwarm &&
					c.name === saveFile.currentSwarm?.pokemon
				) {
					updatedSwarmRecord.push(c.name);
				}
				if (
					saveFile.currentStrongSwarm &&
					c.name === saveFile.currentStrongSwarm?.pokemon
				) {
					updatedSwarmRecord.push(c.name);
				}
				if (
					saveFile.currentDistortionSwarm &&
					c.name === saveFile.currentDistortionSwarm?.pokemon
				) {
					updatedSwarmRecord.push(c.name);
				}
				if (updatedCatchStreak && c.name !== updatedCatchStreak.pokemon) {
					updatedCatchStreak = {
						pokemon: c.name,
						mapId: location.mapId,
						streak: 1,
					};
				} else if (!updatedCatchStreak) {
					updatedCatchStreak = {
						pokemon: c.name,
						mapId: location.mapId,
						streak: 1,
					};
				} else if (
					updatedCatchStreak &&
					c.name === updatedCatchStreak.pokemon
				) {
					updatedCatchStreak = {
						...updatedCatchStreak,
						streak: updatedCatchStreak?.streak + 1,
					};
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
			const randomFieldRank = defeatedChallengerId?.includes(randomFieldId)
				? Number(defeatedChallengerId.split('_')[1])
				: undefined;

			const updatedMileStones = { ...saveFile.mileStones };

			if (challengeFieldRank !== undefined) {
				if (!updatedMileStones.challengeFieldRecord) {
					updatedMileStones.challengeFieldRecord = challengeFieldRank;
				}
				if (challengeFieldRank > updatedMileStones.challengeFieldRecord) {
					updatedMileStones.challengeFieldRecord = challengeFieldRank;
				}
			}
			if (randomFieldRank !== undefined) {
				if (!updatedMileStones.randomFieldRecord) {
					updatedMileStones.randomFieldRecord = randomFieldRank;
				}
				if (randomFieldRank > updatedMileStones.randomFieldRecord) {
					updatedMileStones.randomFieldRecord = randomFieldRank;
				}
			}
			const xp = getHighestXpOnTeam(updatedPokemon);
			if (defeatedChallengerId === barryId) {
				if (
					!updatedMileStones.barryDefeatedAt ||
					xp > updatedMileStones.barryDefeatedAt
				) {
					updatedMileStones.barryDefeatedAt = xp;
				}
			}
			if (defeatedChallengerId === silverId) {
				if (
					!updatedMileStones.silverDefeatedAt ||
					xp > updatedMileStones.silverDefeatedAt
				) {
					updatedMileStones.silverDefeatedAt = xp;
				}
			}
			if (defeatedChallengerId === cynthiaId) {
				if (
					!updatedMileStones.cynthiaDefeatedAt ||
					xp > updatedMileStones.cynthiaDefeatedAt
				) {
					updatedMileStones.cynthiaDefeatedAt = xp;
				}
			}
			if (defeatedChallengerId === nId) {
				if (
					!updatedMileStones.nDefeatedAt ||
					xp > updatedMileStones.nDefeatedAt
				) {
					updatedMileStones.nDefeatedAt = xp;
				}
			}
			if (defeatedChallengerId === redId) {
				if (
					!updatedMileStones.redDefeatedAt ||
					xp > updatedMileStones.redDefeatedAt
				) {
					updatedMileStones.redDefeatedAt = xp;
				}
			}
			if (defeatedChallengerId === hughId) {
				if (
					!updatedMileStones.hughDefeatedAt ||
					xp > updatedMileStones.hughDefeatedAt
				) {
					updatedMileStones.hughDefeatedAt = xp;
				}
			}
			if (
				saveFile.importedChallenger &&
				defeatedChallengerId === saveFile.importedChallenger?.id
			) {
				const challengerXp = getHighestXpOnTeam(
					saveFile.importedChallenger?.team
				);
				if (
					!updatedMileStones.importedChallengerDefeatedAt ||
					challengerXp > updatedMileStones.importedChallengerDefeatedAt
				) {
					updatedMileStones.importedChallengerDefeatedAt = challengerXp;
				}
			}
			updatedMileStones.caughtFromSwarms = updatedSwarmRecord;

			const resetTime = () => {
				const now = new Date().getTime();
				if (
					defeatedChallengerId &&
					[barryId, nId, cynthiaId, silverId, redId, hughId].includes(
						defeatedChallengerId
					)
				) {
					return now + ONE_HOUR;
				}

				return -1;
			};

			patchSaveFileReducer({
				bag: joinInventories(updatedInventory, rewardItems ?? {}),
				money: saveFile.money + scatteredCoins,
				pokemon: updatedPokemon,
				meta: { activeTab: 'OVERWORLD', currentChallenger: undefined },
				researchPoints: saveFile.researchPoints + gainedResearchPoints(),
				handledOccupants: defeatedChallengerId
					? [
							...saveFile.handledOccupants,
							{ id: defeatedChallengerId, resetAt: resetTime() },
					  ]
					: saveFile.handledOccupants,
				mileStones: updatedMileStones,
				pokedex,
				catchStreak: updatedCatchStreak,
			});
		},
		[location, patchSaveFileReducer, saveFile, team]
	);

	return useCallback(
		(payload: LeaveBattlePayload) => {
			if (payload.outcome === 'LOSS') {
				handleLoss();
			} else {
				handleWin(payload);
			}
		},
		[handleLoss, handleWin]
	);
};
