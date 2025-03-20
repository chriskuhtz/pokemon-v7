import { useCallback, useEffect, useMemo, useState } from 'react';
import { TimeOfDayIcon } from '../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../components/WeatherIcon/WeatherIcon';
import { MoveName } from '../../constants/checkLists/movesCheckList';
import { applyEndOfTurnAbility } from '../../functions/applyEndOfTurnAbility';
import { applyEndOfTurnHeldItem } from '../../functions/applyEndOfTurnHeldItem';
import { applyEndOfTurnWeatherDamage } from '../../functions/applyEndOfTurnWeatherDamage';
import { applyOnBattleEnterAbility } from '../../functions/applyOnBattleEnterAbility';
import { applyPrimaryAilmentDamage } from '../../functions/applyPrimaryAilmentDamage';
import { applySecondaryAilmentDamage } from '../../functions/applySecondaryAilmentDamage';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { changeMovePP } from '../../functions/changeMovePP';
import { BattleLocation } from '../../functions/determineCaptureSuccess';
import { getOpponentPokemon } from '../../functions/getOpponentPokemon';
import { getSettings } from '../../functions/getPlayerId';
import { getPlayerPokemon } from '../../functions/getPlayerPokemon';
import { isKO } from '../../functions/isKo';
import { OPPO_ID } from '../../functions/makeChallengerPokemon';
import { reduceSecondaryAilmentDurations } from '../../functions/reduceSecondaryAilmentDurations';
import { sortByPriority } from '../../functions/sortByPriority';
import { Message } from '../../hooks/useMessageQueue';
import { LeaveBattlePayload } from '../../hooks/useSaveFile';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { Inventory, joinInventories } from '../../interfaces/Inventory';
import { ItemType } from '../../interfaces/Item';
import { EmptyStatObject } from '../../interfaces/StatObject';
import { WeatherType } from '../../interfaces/Weather';
import { ControlBar } from './components/ControlBar';
import { EnemyLane } from './components/EnemyLane';
import { PlayerLane } from './components/PlayerLane';
import { RefillHandling } from './components/RefillHandling';
import { useBattleFieldEffects } from './hooks/useBattleFieldEffects';
import { useChooseAction } from './hooks/useChooseAction';
import { useHandleAction } from './hooks/useHandleAction/useHandleAction';

export type ActionType = MoveName | ItemType | 'RUN_AWAY' | 'SLACKING';
export interface ChooseActionPayload {
	userId: string;
	actionName: ActionType;
	targetId: string;
	moveToRestore?: MoveName;
}

export interface BattleFieldEffect {
	type: 'mist' | 'pressure' | 'light-screen' | 'reflect' | 'plus' | 'minus';
	ownerId: string;
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
}: {
	leave: (x: LeaveBattlePayload) => void;
	initOpponents: BattlePokemon[];
	initTeam: BattlePokemon[];
	fightersPerSide: number;
	inventory: Inventory;
	latestMessage: Message | undefined;
	addMessage: (message: Message) => void;
	addMultipleMessages: (newMessages: Message[]) => void;
	challengerId?: string;
}) => {
	const isTrainerBattle = useMemo(() => !!challengerId, [challengerId]);
	const {
		battleFieldEffects: bf,
		addBattleFieldEffect,
		reduceBatttleFieldEffectDurations,
	} = useBattleFieldEffects();
	const [battleRound, setBattleRound] = useState<number>(0);
	const [bW, setBattleWeather] = useState<WeatherType | undefined>();
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
	const team = useMemo(() => getPlayerPokemon(pokemon), [pokemon]);
	const onFieldOpponents = useMemo(
		() =>
			opponents.filter((p) => p.status !== 'BENCH' && p.status !== 'FAINTED'),
		[opponents]
	);
	const onFieldTeam = useMemo(
		() => team.filter((p) => p.status !== 'BENCH' && p.status !== 'FAINTED'),
		[team]
	);

	const battleFieldEffects = useMemo(() => {
		const res = [...bf];
		if (onFieldOpponents.some((p) => p.ability === 'pressure')) {
			res.push({ type: 'pressure', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'pressure')) {
			res.push({ type: 'pressure', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'plus')) {
			res.push({ type: 'plus', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'plus')) {
			res.push({ type: 'plus', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldOpponents.some((p) => p.ability === 'minus')) {
			res.push({ type: 'minus', ownerId: OPPO_ID, duration: 9000 });
		}
		if (onFieldTeam.some((p) => p.ability === 'minus')) {
			res.push({ type: 'minus', ownerId: OPPO_ID, duration: 9000 });
		}
		return res;
	}, [bf, onFieldOpponents, onFieldTeam]);

	const allOnField = useMemo(
		() => [...onFieldTeam, ...onFieldOpponents],
		[onFieldOpponents, onFieldTeam]
	);
	const battleWeather: WeatherType | undefined = useMemo(() => {
		if (
			bW &&
			allOnField.some(
				(p) => p.ability === 'air-lock' || p.ability === 'cloud-nine'
			)
		) {
			return `${bW}_effectless` as WeatherType;
		}
		return bW;
	}, [allOnField, bW]);
	const nextPokemonWithoutMove = useMemo(() => {
		if (battleStep !== 'COLLECTING') {
			return;
		}
		return [...onFieldTeam, ...onFieldOpponents].find(
			(p) =>
				!p.moveQueue.some((m) => m.round === battleRound) &&
				p.status === 'ONFIELD'
		);
	}, [battleRound, battleStep, onFieldOpponents, onFieldTeam]);
	const nextMover = useMemo(() => {
		if (battleStep !== 'EXECUTING') {
			return;
		}

		return [...onFieldOpponents, ...onFieldTeam]
			.sort((a, b) => sortByPriority(a, b, battleRound, battleWeather))
			.find((p) => p.moveQueue.some((m) => m.round === battleRound));
	}, [battleRound, battleStep, battleWeather, onFieldOpponents, onFieldTeam]);
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
			team.some((t) => t.status === 'BENCH')
		);
	}, [fightersPerSide, onFieldTeam, team]);
	const opponentCanRefill = useMemo(() => {
		return (
			onFieldOpponents.length < fightersPerSide &&
			opponents.some((t) => t.status === 'BENCH')
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
			});
		},
		[battleInventory, challengerId, leave, pokemon, scatteredCoins, team]
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
	const handleDeploymentAbility = useCallback(
		(p: BattlePokemon) => {
			applyOnBattleEnterAbility({
				user: p,
				setPokemon,
				addMessage,
				currentWeather: battleWeather,
				setWeather: setBattleWeather,
				battleFieldEffects,
			});
		},
		[addMessage, battleFieldEffects, battleWeather]
	);

	// const switchPokemon = useCallback(
	// 	(leavesBattle: BattlePokemon, entersBattle: BattlePokemon) => {
	// 		setPokemon((pokemon) =>
	// 			pokemon.map((p) => {
	// 				if (p.id === leavesBattle.id) {
	// 					addMessage({ message: `withdrew ${leavesBattle.data.name}` });
	// 					return { ...leavesBattle, status: 'BENCH', primaryAilment:persistentPrimaryAilment(leavesBattle.primaryAilment) };
	// 				}
	// 				if (p.id === entersBattle.id) {
	// 					addMessage({
	// 						message: `Lets go ${entersBattle.data.name}`,
	// 					});

	// 					return { ...entersBattle, status: 'ONFIELD' };
	// 				}
	// 				//TODO: remap moves if "leavesBattle" is the target
	// 				//TODO: consider shadow tag and magnet pull
	// 				return p;
	// 			})
	// 		);
	// 	},
	// 	[addMessage]
	// );
	const handleForceSwitch = useCallback(
		(user: BattlePokemon, moveName: MoveName) => {
			const otherSideHasSuctionCups = pokemon.find(
				(p) =>
					p.ability === 'suction-cups' &&
					p.ownerId !== user.ownerId &&
					p.status === 'ONFIELD'
			);

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
				return;
			}

			//TODO: consider trainer battles
			addMessage({
				message: `${user.data.name} separated the fighters with ${moveName}`,
				onRemoval: () => leaveWithCurrentData('DRAW'),
			});
		},
		[addMessage, leaveWithCurrentData, pokemon]
	);
	const chooseAction = useChooseAction(
		allOnField,
		pokemon,
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
		addMultipleMessages,
		battleRound,
		battleLocation,
		addUsedItem,
		scatterCoins,
		dampy,
		handleForceSwitch,
		addBattleFieldEffect,
		battleFieldEffects
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
				handleDeploymentAbility(newlyDeployedPokemon);
			}
		}
	}, [
		battleStep,
		handleDeploymentAbility,
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
				reduceBatttleFieldEffectDurations();
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
		reduceBatttleFieldEffectDurations,
	]);
	// End Of Turn
	useEffect(() => {
		if (!latestMessage && battleStep === 'END_OF_TURN') {
			const collectedMessages: string[] = [];
			const updatedPokemon = pokemon.map((p) => {
				if (p.status === 'ONFIELD') {
					let updated = applyEndOfTurnAbility({
						pokemon: p,
						addMessage: (x) => collectedMessages.push(x.message),
					});
					updated = applyEndOfTurnHeldItem(updated, (x) =>
						collectedMessages.push(x)
					);
					updated = applyPrimaryAilmentDamage(updated, (x) =>
						collectedMessages.push(x)
					);
					updated = applySecondaryAilmentDamage(updated, (x) =>
						collectedMessages.push(x)
					);
					updated = reduceSecondaryAilmentDurations(updated, (x) =>
						collectedMessages.push(x)
					);
					updated = applyEndOfTurnWeatherDamage(
						updated,
						(x) => collectedMessages.push(x),
						battleWeather
					);
					//resets at end of turn
					updated = { ...updated, lastReceivedDamage: undefined };

					return updated;
				}

				return p;
			});

			if (!latestMessage && collectedMessages.length === 0) {
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
		addMultipleMessages,
		battleStep,
		battleWeather,
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
			const { rogueLike } = getSettings() ?? {};
			console.log('effect battlelost');
			addMessage({
				message: rogueLike
					? 'You lost the battle and have to reset'
					: 'You lost the battle and rushed back home',
				onRemoval: () => leaveWithCurrentData('LOSS'),
			});
		}
		if (battleWon && !latestMessage) {
			console.log('effect battlewon');

			const defeatedPokemon = getOpponentPokemon(pokemon).filter(
				(p) => p.status === 'FAINTED'
			);
			let gainedXp = defeatedPokemon.reduce((sum, d) => {
				const { level } = calculateLevelData(d.xp);

				return sum + Math.floor((d.data.base_experience * level) / 7);
			}, 0);
			if (isTrainerBattle) {
				gainedXp *= 1.5;
			}

			const xpPerTeamMember = Math.round(gainedXp / team.length);

			const leveledUpTeam = team.map((p) => {
				const newXp = p.xp + xpPerTeamMember;
				return { ...p, xp: newXp };
			});

			const levelUpMessages: Message[] = leveledUpTeam
				.map((pokemon) => {
					const prev = team.find((t) => t.id === pokemon.id);
					if (!prev) {
						return;
					}
					const prevLevel = calculateLevelData(prev.xp).level;
					const level = calculateLevelData(pokemon.xp).level;

					if (prevLevel !== level) {
						return { message: `${pokemon.name} reached level ${level}` };
					}
					return;
				})
				.filter((m) => m !== undefined);

			addMultipleMessages(
				[
					xpPerTeamMember > 0
						? {
								message: `Each Team Member gained ${xpPerTeamMember} XP`,
						  }
						: undefined,
					...levelUpMessages,
					{
						message: 'You won the battle',
						onRemoval: () =>
							leaveWithCurrentData('WIN', defeatedPokemon, leveledUpTeam),
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
		pokemon,
		scatteredCoins,
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
		<div
			style={{
				display: 'grid',
				gridTemplateRows: '4fr 4fr 1fr',
				height: '100dvh',
				backgroundColor: 'white',
			}}
		>
			<div style={{ position: 'absolute', top: 0, left: '48dvw' }}>
				<WeatherIcon weather={battleWeather} />
				<TimeOfDayIcon />
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateRows: 'subgrid',
					alignItems: 'stretch',
					gridRowStart: 1,
					gridRowEnd: 4,
				}}
			>
				<EnemyLane onFieldOpponents={onFieldOpponents} />
				<PlayerLane onFieldTeam={onFieldTeam} />
			</div>
			{!latestMessage && (
				<div
					style={{
						maxWidth: '100dvw',
						overflow: 'scroll',
						borderTop: '1px solid black',
						minHeight: '103px',
						maxHeight: '103px',
					}}
				>
					<ControlBar
						controlled={nextPokemonWithoutMove}
						targets={pokemon}
						chooseAction={chooseAction}
						playerInventory={battleInventory}
						catchingAllowed={!isTrainerBattle}
					/>
				</div>
			)}
		</div>
	);
};
