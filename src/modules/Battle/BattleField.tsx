import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import {
	TerrainIcon,
	WeatherIcon,
} from '../../components/WeatherIcon/WeatherIcon';
import { MoveName } from '../../constants/movesCheckList';
import {
	applyEndOfTurnAbility,
	applyGrassyTerrainHeal,
} from '../../functions/applyEndOfTurnAbility';
import { applyEndOfTurnHeldItem } from '../../functions/applyEndOfTurnHeldItem';
import { applyEndOfTurnWeatherDamage } from '../../functions/applyEndOfTurnWeatherDamage';
import { applyEVGain } from '../../functions/applyEVGain';
import { applyHappinessChange } from '../../functions/applyHappinessChange';
import { applyOnBattleEnterAbilityAndEffects } from '../../functions/applyOnBattleEnterAbility';
import { applyPrimaryAilmentDamage } from '../../functions/applyPrimaryAilmentDamage';
import { applySecondaryAilmentDamage } from '../../functions/applySecondaryAilmentDamage';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { changeMovePP } from '../../functions/changeMovePP';
import { BattleLocation } from '../../functions/determineCaptureSuccess';
import { getHeldItem } from '../../functions/getHeldItem';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { getTeamSize } from '../../functions/getTeamSize';
import { handleCheekPouch } from '../../functions/handleCheekPouch';
import { isKO } from '../../functions/isKo';
import { reduceSecondaryAilmentDurations } from '../../functions/reduceSecondaryAilmentDurations';
import { sortByPriority } from '../../functions/sortByPriority';
import { LocationContext } from '../../hooks/LocationProvider';
import { GameDataContext } from '../../hooks/useGameData';
import { LeaveBattlePayload } from '../../hooks/useLeaveBattle';
import { useLocationColors } from '../../hooks/useLocationColors';
import { Message } from '../../hooks/useMessageQueue';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { EmptyStatObject, Stat } from '../../interfaces/StatObject';
import { ControlBar } from './components/ControlBar';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { RefillHandling } from './components/RefillHandling';
import { checkAndHandleFainting } from './functions/handleFainting';
import { useBattleFieldEffects } from './hooks/useBattleFieldEffects';
import { useBattleTerrain } from './hooks/useBattleTerrain';
import { useBattleWeather } from './hooks/useBattleWeather';
import { useChooseAction } from './hooks/useChooseAction';
import { useHandleAction } from './hooks/useHandleAction/useHandleAction';

export type ActionType =
	| MoveName
	| ItemType
	| 'RUN_AWAY'
	| 'LOAFING'
	| 'SWITCH';
export interface ChooseActionPayload {
	userId: string;
	actionName: ActionType;
	targetId: string;
	moveToRestore?: MoveName;
}

export interface BattleFieldEffect {
	type:
		| 'mist'
		| 'pressure'
		| 'light-screen'
		| 'reflect'
		| 'plus'
		| 'minus'
		| 'spider-web'
		| 'arena-trap'
		| 'shadow-tag'
		| 'magnet-pull'
		| 'spikes'
		| 'toxic-spikes'
		| 'flower-gift'
		| 'bad-dreams'
		| 'unnerve'
		| 'safeguard'
		| 'friend-guard'
		| 'victory-star'
		| 'aroma-veil'
		| 'flower-veil'
		| 'sweet-veil'
		| 'dark-aura'
		| 'aura-break'
		| 'fairy-aura'
		| 'tailwind'
		| 'battery'
		| 'power-spot'
		| 'steely-spirit'
		| 'pastel-veil'
		| 'sticky-web'
		| 'aurora-veil'
		| 'lucky-chant'
		| 'stealth-rock';
	ownerId: string;
	applicatorId?: string;
	duration: number;
}

export const BattleField = ({
	leave,
	initOpponents,
	initTeam,
	inventory,
	fightersPerSide,
	latestMessage,
	addMessage,
	addMultipleMessages,
	challengerId,
	rewardItems,
	spriteGeneration,
	challengerType,
}: {
	leave: (x: LeaveBattlePayload) => void;
	initOpponents: BattlePokemon[];
	initTeam: BattlePokemon[];
	fightersPerSide: number;
	inventory: Inventory;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	challengerId: string;
	rewardItems?: Partial<Inventory>;
	spriteGeneration?: 1;
	challengerType: 'TRAINER' | 'WILD';
}) => {
	const { saveFile } = useContext(SaveFileContext);
	const { settings, playerId } = saveFile;
	const { location } = useContext(LocationContext);
	const { losingMessages } = useContext(GameDataContext);
	const { playerColor, oppColor } = useLocationColors();
	const isTrainerBattle = useMemo(() => {
		return challengerType === 'TRAINER';
	}, [challengerType]);
	const runningAllowed = useMemo(
		() => !isTrainerBattle && !settings?.noRunningFromBattle,
		[isTrainerBattle, settings?.noRunningFromBattle]
	);
	const catchingAllowed = useMemo(() => {
		if (settings?.noStorageSystem) {
			return (
				saveFile.pokemon.filter((p) => p.onTeam).length < getTeamSize(saveFile)
			);
		}
		return !isTrainerBattle;
	}, [isTrainerBattle, saveFile, settings?.noStorageSystem]);

	const [battleRound, setBattleRound] = useState<number>(0);
	const [battleLocation] = useState<BattleLocation>('STANDARD');

	const [scatteredCoins, setScatteredCoins] = useState<number>(0);
	const scatterCoins = () =>
		setScatteredCoins((c) => c + Math.floor(Math.random() * 100));
	const [battleStep, setBattleStep] = useState<
		| 'UNITIALIZED'
		| 'BATTLE_ENTRY'
		| 'COLLECTING'
		| 'EXECUTING'
		| 'END_OF_TURN'
		| 'REFILLING'
	>('UNITIALIZED');
	useEffect(() => {
		console.log(battleStep);
	}, [battleStep]);

	const [battleInventory, setBattleInventory] = useState<Inventory>(inventory);
	const addUsedItem = useCallback((item: ItemType) => {
		setBattleInventory((bI) => joinInventories(bI, { [item]: 1 }, true));
	}, []);

	const [pokemon, setPokemon] = useState<BattlePokemon[]>([
		...initOpponents,
		...initTeam,
	]);

	//SELECTORS

	const opponents = useMemo(() => getOpponentPokemon(pokemon), [pokemon]);
	const team = useMemo(
		() => getPlayerPokemon(pokemon, playerId),
		[pokemon, playerId]
	);
	const onFieldOpponents = useMemo(
		() =>
			opponents.filter((p) => p.status !== 'BENCH' && p.status !== 'FAINTED'),
		[opponents]
	);

	const onFieldTeam = useMemo(
		() => team.filter((p) => p.status !== 'BENCH' && p.status !== 'FAINTED'),
		[team]
	);

	const allOnField = useMemo(
		() => [...onFieldTeam, ...onFieldOpponents],
		[onFieldOpponents, onFieldTeam]
	);

	const { battleWeather, setBattleWeather, reduceWeatherDuration } =
		useBattleWeather(allOnField);
	const { battleTerrain, setBattleTerrain } = useBattleTerrain();

	const {
		battleFieldEffects,
		addBattleFieldEffect,
		reduceBattleFieldEffectDurations,
		removeSpikes,
		removeScreens,
	} = useBattleFieldEffects(onFieldOpponents, onFieldTeam, battleWeather);

	const nextPokemonWithoutMove = useMemo(() => {
		if (battleStep !== 'COLLECTING') {
			return;
		}
		return [...onFieldTeam, ...onFieldOpponents].find(
			(p) =>
				p.status === 'ONFIELD' &&
				!p.moveQueue.some((m) => m.round === battleRound)
		);
	}, [battleRound, battleStep, onFieldOpponents, onFieldTeam]);
	const nextMover = useMemo(() => {
		if (battleStep !== 'EXECUTING') {
			return;
		}

		const quickDrawActivates = Math.random() > 0.7;
		return [...onFieldOpponents, ...onFieldTeam]
			.sort((a, b) =>
				sortByPriority(
					a,
					b,
					battleRound,
					battleWeather,
					battleFieldEffects,
					battleTerrain,
					quickDrawActivates
				)
			)
			.find((p) => p.moveQueue.some((m) => m.round === battleRound));
	}, [
		battleFieldEffects,
		battleRound,
		battleStep,
		battleTerrain,
		battleWeather,
		onFieldOpponents,
		onFieldTeam,
	]);
	const newlyDeployedPokemon = useMemo(() => {
		if (battleStep !== 'BATTLE_ENTRY') {
			return;
		}
		return [...onFieldOpponents, ...onFieldTeam].find(
			(p) => p.roundsInBattle === 0
		);
	}, [battleStep, onFieldOpponents, onFieldTeam]);
	const battleWon = useMemo(
		() =>
			opponents.every((o) => o.status === 'CAUGHT' || o.status === 'FAINTED'),
		[opponents]
	);
	const battleLost = useMemo(
		() => team.every((t) => t.status === 'FAINTED'),
		[team]
	);
	const teamCanRefill = useMemo(() => {
		return (
			onFieldTeam.length < fightersPerSide &&
			team.some((t) => !isKO(t) && t.status === 'BENCH')
		);
	}, [fightersPerSide, onFieldTeam, team]);
	const opponentCanRefill = useMemo(() => {
		return (
			onFieldOpponents.length < fightersPerSide &&
			opponents.some((t) => !isKO(t) && t.status === 'BENCH')
		);
	}, [fightersPerSide, onFieldOpponents, opponents]);
	const dampy: { name: string } | undefined = useMemo(() => {
		const mon = allOnField.find((p) => p.ability === 'damp');

		if (mon) {
			return { name: mon.data.name };
		}
	}, [allOnField]);

	//REDUCERS
	const leaveWithCurrentData = useCallback(
		(
			outcome: 'WIN' | 'LOSS' | 'DRAW',
			defeatedPokemon?: BattlePokemon[],
			leveledUpTeam?: BattlePokemon[]
		) => {
			leave({
				caughtPokemon: pokemon.filter((p) => p.status === 'CAUGHT'),
				updatedInventory: battleInventory,
				scatteredCoins,
				team: leveledUpTeam ?? team,
				defeatedPokemon: defeatedPokemon ?? [],
				outcome,
				defeatedChallengerId: challengerId,
				rewardItems,
			});
		},
		[
			battleInventory,
			challengerId,
			leave,
			pokemon,
			rewardItems,
			scatteredCoins,
			team,
		]
	);
	const putPokemonOnField = useCallback(
		(id: string) =>
			setPokemon((pokemon) =>
				pokemon.map((p) => {
					if (p.id === id) {
						if (p.status !== 'BENCH') {
							throw new Error(
								'how on gods good earth do ya wanna put a fainted/caught pokemon on the field, lebowski?'
							);
						}
						if (p.ability === 'natural-cure' && p.primaryAilment) {
							addMessage({
								message: `${p.data.name} cured itself with natural cure`,
							});
						}
						return {
							...p,
							status: 'ONFIELD',
							roundsInBattle: 0,
							moveQueue: [],
							flashFired: false,
							colorChangedType: undefined,
							statBoosts: EmptyStatObject,
							secondaryAilments: [],
							primaryAilment:
								//natural cure removes ailments on battle enter
								p.ability === 'natural-cure' ? undefined : p.primaryAilment,
						};
					}
					return p;
				})
			),
		[addMessage]
	);
	const handleDeploymentAbilityAndEffects = useCallback(
		(p: BattlePokemon) => {
			setPokemon(
				applyOnBattleEnterAbilityAndEffects({
					user: p,
					pokemon,
					addMessage,
					currentWeather: battleWeather,
					setWeather: setBattleWeather,
					battleFieldEffects,
					setBattleTerrain,
					removeScreens,
					terrain: battleTerrain,
					addBattleFieldEffect,
					settings,
				})
			);
		},
		[
			addBattleFieldEffect,
			addMessage,
			battleFieldEffects,
			battleTerrain,
			battleWeather,
			pokemon,
			removeScreens,
			setBattleTerrain,
			setBattleWeather,
			settings,
		]
	);
	const handleForceSwitch = useCallback(
		(user: BattlePokemon, moveName: MoveName): BattlePokemon[] => {
			const otherSideHasSuctionCups = pokemon.find(
				(p) =>
					p.ability === 'suction-cups' &&
					p.ownerId !== user.ownerId &&
					p.status === 'ONFIELD'
			);
			if (isTrainerBattle) {
				addMessage({
					message: `it failed`,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return { ...p, moveQueue: [] };
						}
						return p;
					})
				);
				return pokemon;
			}
			if (otherSideHasSuctionCups) {
				addMessage({
					message: `${otherSideHasSuctionCups.data.name} prevents force switching with suction cups`,
				});
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.id === user.id) {
							return {
								...changeMovePP(user, moveName, -1),
								moveQueue: [],
							};
						}
						return p;
					})
				);
				return pokemon;
			}

			addMessage({
				message: `${user.data.name} separated the fighters with ${moveName}`,
				onRemoval: () => leaveWithCurrentData('DRAW'),
			});
			return pokemon;
		},
		[addMessage, isTrainerBattle, leaveWithCurrentData, pokemon]
	);
	const chooseAction = useChooseAction(
		allOnField,
		setPokemon,
		battleRound,
		battleWeather
	);
	const handleAction = useHandleAction(
		pokemon,
		setPokemon,
		addMessage,
		leaveWithCurrentData,
		battleWeather,
		battleTerrain,
		addMultipleMessages,
		battleRound,
		battleLocation,
		addUsedItem,
		scatterCoins,
		dampy,
		handleForceSwitch,
		addBattleFieldEffect,
		battleFieldEffects,
		setBattleWeather,
		removeSpikes,
		removeScreens,
		setBattleTerrain
	);

	//Steps:
	// Battle Entry
	useEffect(() => {
		if (battleStep === 'UNITIALIZED' && !opponentCanRefill && !teamCanRefill) {
			setBattleStep('BATTLE_ENTRY');
		}
	}, [battleStep, opponentCanRefill, teamCanRefill]);
	useEffect(() => {
		if (battleStep === 'BATTLE_ENTRY') {
			if (!newlyDeployedPokemon) {
				setBattleStep('COLLECTING');
				return;
			}
			if (newlyDeployedPokemon && !latestMessage) {
				handleDeploymentAbilityAndEffects(newlyDeployedPokemon);
			}
		}
	}, [
		battleStep,
		handleDeploymentAbilityAndEffects,
		latestMessage,
		newlyDeployedPokemon,
		nextPokemonWithoutMove,
	]);
	// Collecting
	useEffect(() => {
		if (battleStep === 'COLLECTING' && !nextPokemonWithoutMove) {
			setBattleStep('EXECUTING');
		}
	}, [battleStep, nextPokemonWithoutMove]);
	// Executing
	useEffect(() => {
		if (battleStep === 'EXECUTING') {
			if (!latestMessage && !nextMover) {
				setBattleStep('END_OF_TURN');
				setBattleRound((battleRound) => battleRound + 1);
				reduceBattleFieldEffectDurations();
				reduceWeatherDuration();
				setPokemon((pokemon) =>
					pokemon.map((p) => {
						if (p.status === 'ONFIELD') {
							return { ...p, roundsInBattle: p.roundsInBattle + 1 };
						}
						return p;
					})
				);
				return;
			}
			if (nextMover && !latestMessage) {
				handleAction(nextMover);
			}
		}
	}, [
		battleStep,
		handleAction,
		latestMessage,
		nextMover,
		reduceBattleFieldEffectDurations,
		reduceWeatherDuration,
	]);
	// End Of Turn
	useEffect(() => {
		if (!latestMessage && battleStep === 'END_OF_TURN') {
			const collectedMessages: string[] = [];
			const updatedPokemon = pokemon.map((p) => {
				if (p.status === 'ONFIELD') {
					let updated = applyPrimaryAilmentDamage(p, (x) =>
						collectedMessages.push(x)
					);
					updated = applySecondaryAilmentDamage(updated, (x) =>
						collectedMessages.push(x)
					);
					updated = reduceSecondaryAilmentDurations(
						updated,
						(x) => collectedMessages.push(x),
						allOnField
					);

					const allyIsHealer = !!pokemon.find(
						(ally) =>
							ally.id !== p.id &&
							ally.ownerId === p.ownerId &&
							ally.status === 'ONFIELD' &&
							ally.ability === 'healer'
					);

					updated = applyEndOfTurnAbility({
						allyIsHealer,
						initialPokemon: [...initOpponents, ...initTeam].find(
							(initPok) => initPok.id === p.id
						),
						pokemon: updated,
						addMessage: (x) => collectedMessages.push(x.message),
					});
					updated = applyGrassyTerrainHeal({
						terrain: battleTerrain,
						pokemon: updated,
						addMessage,
					});
					updated = applyEndOfTurnHeldItem(
						updated,
						(x) => collectedMessages.push(x),
						(x) => collectedMessages.push(...x),
						battleFieldEffects,
						battleTerrain,
						battleInventory
					);
					updated = handleCheekPouch(updated, (x) => collectedMessages.push(x));

					updated = applyEndOfTurnWeatherDamage(
						updated,
						(x) => collectedMessages.push(x),
						battleWeather
					);
					//resets at end of turn
					updated = { ...updated, lastReceivedDamage: undefined };

					updated = checkAndHandleFainting(updated, pokemon, (x) =>
						collectedMessages.push(x.message)
					);
					return updated;
				}

				return p;
			});

			if (!latestMessage && collectedMessages.length === 0) {
				setPokemon(updatedPokemon);
				setBattleStep('REFILLING');
				return;
			} else {
				addMultipleMessages(
					collectedMessages.map((m, i) => ({
						message: m,
						onRemoval:
							i === collectedMessages.length - 1
								? () => {
										setPokemon(updatedPokemon);
										setBattleStep('REFILLING');
								  }
								: undefined,
					}))
				);
			}
		}
	}, [
		addMessage,
		addMultipleMessages,
		allOnField,
		battleFieldEffects,
		battleInventory,
		battleStep,
		battleTerrain,
		battleWeather,
		initOpponents,
		initTeam,
		latestMessage,
		nextPokemonWithoutMove,
		pokemon,
	]);
	// Refilling
	useEffect(() => {
		if (battleStep === 'REFILLING' && !teamCanRefill && !opponentCanRefill) {
			setBattleStep('BATTLE_ENTRY');
		}
	}, [
		battleStep,
		latestMessage,
		nextPokemonWithoutMove,
		opponentCanRefill,
		teamCanRefill,
	]);
	// Battle Over
	useEffect(() => {
		if (battleLost && !latestMessage) {
			const { rogueLike } = settings ?? {};
			console.log('effect battlelost');

			const message = () => {
				if (location.mapId === 'camp' || location.mapId === 'challengeField') {
					return losingMessages.training;
				}
				if (rogueLike) {
					return losingMessages.reset;
				}

				return losingMessages.wild;
			};
			addMessage({
				message: message(),
				onRemoval: () => leaveWithCurrentData('LOSS'),
			});
		}
		if (battleWon && !latestMessage) {
			console.log('effect battlewon');

			const defeatedPokemon = getOpponentPokemon(pokemon).filter(
				(p) => p.status === 'FAINTED'
			);
			//XP
			let gainedXp = defeatedPokemon.reduce((sum, d) => {
				const { level } = calculateLevelData(d.xp, d.growthRate);

				return sum + Math.floor((d.data.base_experience * level) / 7);
			}, 0);
			if (isTrainerBattle) {
				gainedXp *= 1.5;
			}
			if (settings?.doubleXpRates) {
				gainedXp *= 2;
			}
			const xpPerTeamMember = () => {
				if (settings?.expShareActive) {
					return Math.round(gainedXp / team.filter((t) => !isKO(t)).length);
				}

				return Math.round(
					gainedXp /
						team.filter((t) => t.participatedInBattle && !isKO(t)).length
				);
			};

			const getsRewards = (p: BattlePokemon) =>
				(settings?.expShareActive || p.participatedInBattle) && !isKO(p);
			//XP REWARD
			const leveledUpTeam = team.map((p) => {
				if (getsRewards(p)) {
					const luckyEggfactor =
						getHeldItem(p, false) === 'lucky-egg' ? 1.5 : 1;
					const gained = xpPerTeamMember() * luckyEggfactor;
					const newXp = p.xp + gained;
					return { ...p, xp: newXp };
				}
				return p;
			});
			const levelUpMessages: Message[] = leveledUpTeam
				.map((pokemon) => {
					const prev = team.find((t) => t.id === pokemon.id);
					if (!prev) {
						return;
					}
					const prevLevel = calculateLevelData(prev.xp, prev.growthRate).level;
					const level = calculateLevelData(
						pokemon.xp,
						pokemon.growthRate
					).level;

					if (prevLevel !== level) {
						return { message: `${pokemon.name} reached level ${level}` };
					}
					return;
				})
				.filter((m) => m !== undefined);
			//FRIENDSHIP REWARD, only for participants
			const friendshipIncreasedTeam = leveledUpTeam.map((p) => {
				if (p.participatedInBattle) {
					return applyHappinessChange(p, 1);
				}
				return p;
			});
			//EV REWARD, only for participants
			const evGainedTeam = friendshipIncreasedTeam.map((p) => {
				{
					if (p.participatedInBattle) {
						const updated = { ...p };
						defeatedPokemon.forEach((defeated) => {
							Object.entries(defeated.evAwards).forEach(([stat, award]) => {
								updated.effortValues = applyEVGain(
									updated.effortValues,
									stat as Stat,
									award,
									getHeldItem(p, false)
								);
							});
						});
						return updated;
					}
					return p;
				}
			});

			addMultipleMessages(
				[
					xpPerTeamMember() > 0
						? {
								message: `Each Team Member gained ${xpPerTeamMember()} XP`,
						  }
						: undefined,
					...levelUpMessages,
					{
						message: 'You won the battle',
						onRemoval: () =>
							leaveWithCurrentData('WIN', defeatedPokemon, evGainedTeam),
					},
				].filter((m) => m !== undefined)
			);
		}
	}, [
		addMessage,
		addMultipleMessages,
		battleInventory,
		battleLost,
		battleWon,
		isTrainerBattle,
		latestMessage,
		leaveWithCurrentData,
		location.mapId,
		losingMessages.reset,
		losingMessages.training,
		losingMessages.wild,
		pokemon,
		scatteredCoins,
		settings,
		team,
	]);

	//Refill opponents
	useEffect(() => {
		if (battleStep === 'REFILLING' && opponentCanRefill) {
			const options = opponents.filter((t) => t.status === 'BENCH' && !isKO(t));
			const t = options[0];
			addMessage({
				message: `Opponent sends out ${t.data.name}`,
				onRemoval: () => putPokemonOnField(t.id),
			});
		}
	}, [addMessage, battleStep, opponentCanRefill, opponents, putPokemonOnField]);

	if (battleStep === 'REFILLING' && teamCanRefill) {
		return (
			<RefillHandling
				putPokemonOnField={putPokemonOnField}
				team={team}
				teamCanRefill={teamCanRefill}
				addMessage={addMessage}
			/>
		);
	}

	return (
		<div style={{ backgroundColor: 'white' }}>
			<div
				style={{
					display: 'grid',
					gridTemplateRows: '1fr 4fr 4fr 4fr',
					height: '100dvh',
					gap: '.5rem',
					background: `linear-gradient(
					218deg,
					${oppColor} 0%,
					${playerColor} 100%
				)`,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '.5rem',
					}}
				>
					<WeatherIcon weather={battleWeather} />
					<TimeOfDayIcon />
					<TerrainIcon terrain={battleTerrain} />
				</div>

				<EnemyLane
					onFieldOpponents={onFieldOpponents}
					spriteGeneration={spriteGeneration}
				/>
				<PlayerLane onFieldTeam={onFieldTeam} />

				<div
					style={{
						maxWidth: '100dvw',
						overflow: 'scroll',
					}}
				>
					<ControlBar
						disabled={!!latestMessage}
						controlled={nextPokemonWithoutMove}
						targets={pokemon}
						chooseAction={chooseAction}
						playerInventory={battleInventory}
						catchingAllowed={catchingAllowed}
						runningAllowed={runningAllowed}
						battleFieldEffects={battleFieldEffects}
						weather={battleWeather}
						terrain={battleTerrain}
					/>
				</div>
			</div>
		</div>
	);
};
