import { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { abilityNames } from './constants/checkLists/abilityCheckList';
import { handledMoves } from './constants/checkLists/movesCheckList';
import { testOpponent, testPokemon, testState } from './constants/gameData';
import { testMap } from './constants/maps/testmap';
import { STANDARD_BUY_MARKET } from './constants/standardBuyMarket';
import {
	determineHeldItem,
	getHeldItemRateModifier,
} from './functions/determineHeldItem';
import { useSaveFile } from './hooks/useSaveFile';
import { AddToastFunction } from './hooks/useToasts';
import { generateInventory, Inventory } from './interfaces/Inventory';
import { OwnedPokemon } from './interfaces/OwnedPokemon';
import { Bag } from './modules/Bag/Bag';
import { Battle } from './modules/Battle/Battle';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { BuyMarket } from './modules/Market/BuyMarket';
import { Market } from './modules/Market/Market';
import { SellMarket } from './modules/Market/SellMarket';
import { Overworld } from './modules/Overworld/Overworld';
import { PokemonStorage } from './modules/PokemonStorage/PokemonStorage';
import { Quests } from './modules/Quests/Quests';
import { Settings } from './modules/Settings/Settings';
import { StarterSelection } from './modules/StarterSelection/StarterSelection';
import { Team } from './modules/Team/Team';

export const App = ({
	addToast,
}: {
	activeToast: boolean;
	addToast: AddToastFunction;
}): JSX.Element => {
	const [currentOpponent, setCurrentOpponent] =
		useState<OwnedPokemon>(testOpponent);
	const [currentMarketInventory, setCurrentMarketInventory] =
		useState<Partial<Inventory>>(STANDARD_BUY_MARKET);
	const {
		saveFile,
		discardItemReducer,
		setActiveTabReducer,
		sellItemReducer,
		buyItemReducer,
		setCharacterLocationReducer,
		collectItemReducer,
		setPokemonReducer,
		talkToNurseReducer,
		patchSaveFileReducer,
		navigateAwayFromOverworldReducer,
		cutBushReducer,
		applyItemToPokemonReducer,
		fulfillQuestReducer,
	} = useSaveFile(testState, addToast, true);

	const {
		meta: { activeTab },
		inventory,
		pokemon,
		money,
		location,
		collectedItems,
		badges,
		playerId,
		quests,
	} = saveFile;

	const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

	const firstTeamMember = team[0];

	if (activeTab === 'BATTLE') {
		return (
			<Battle
				opponent={currentOpponent}
				leave={() => setActiveTabReducer('OVERWORLD')}
			/>
		);
	}
	if (activeTab === 'SETTINGS') {
		return (
			<Settings
				proceed={(randomStarters: boolean) => {
					patchSaveFileReducer({
						settings: {
							randomStarters: randomStarters,
						},
					});
				}}
			/>
		);
	}
	if (activeTab === 'STARTER_SELECTION') {
		return (
			<StarterSelection
				randomStarters={!!saveFile.settings?.randomStarters}
				proceed={(name: string, starterId: number) => {
					patchSaveFileReducer({
						playerId: name,
						pokemon: [
							...saveFile.pokemon,
							{
								...testPokemon,
								dexId: starterId,
								id: v4(),
								ownerId: name,
								onTeam: true,
							},
						],
						meta: { activeTab: 'OVERWORLD' },
					});
				}}
			/>
		);
	}
	if (activeTab === 'MAIN') {
		return (
			<MainMenu
				money={money}
				goBack={() => setActiveTabReducer('OVERWORLD')}
				navigate={setActiveTabReducer}
				badges={badges}
				spriteUrl="/npcs/NPC_001.png"
				name={playerId}
			/>
		);
	}
	if (activeTab === 'QUESTS') {
		return (
			<Quests
				quests={quests}
				goBack={() => setActiveTabReducer('MAIN')}
				fulfillQuest={fulfillQuestReducer}
				saveFile={saveFile}
			/>
		);
	}
	if (activeTab === 'BAG') {
		return (
			<Bag
				inventory={saveFile.inventory}
				discardItem={discardItemReducer}
				goBack={() => setActiveTabReducer('MAIN')}
				team={team}
				applyItem={applyItemToPokemonReducer}
			/>
		);
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				team={team}
				goBack={() => setActiveTabReducer('MAIN')}
				reorderTeam={(newTeam: OwnedPokemon[]) =>
					setPokemonReducer([...newTeam, ...pokemon.filter((p) => !p.onTeam)])
				}
			/>
		);
	}
	if (activeTab === 'STORAGE') {
		return (
			<PokemonStorage
				addToast={addToast}
				allPokemon={pokemon}
				goBack={() => setActiveTabReducer('OVERWORLD')}
				setPokemon={setPokemonReducer}
			/>
		);
	}
	if (activeTab === 'BUY_MARKET') {
		return (
			<BuyMarket
				buyItem={buyItemReducer}
				money={money}
				goBack={() => setActiveTabReducer('MARKET')}
				inventory={generateInventory(currentMarketInventory)}
				owned={inventory}
			/>
		);
	}
	if (activeTab === 'SELL_MARKET') {
		return (
			<SellMarket
				goBack={() => setActiveTabReducer('MARKET')}
				inventory={inventory}
				sellItem={sellItemReducer}
			/>
		);
	}
	if (activeTab === 'MARKET') {
		return (
			<Market
				goBack={() => setActiveTabReducer('OVERWORLD')}
				navigate={setActiveTabReducer}
			/>
		);
	}

	return (
		<Overworld
			openMenu={(steps) => navigateAwayFromOverworldReducer('MAIN', steps)}
			setCharacterLocation={setCharacterLocationReducer}
			collectItem={collectItemReducer}
			playerLocation={location}
			map={testMap}
			collectedItems={collectedItems}
			startEncounter={({ dexId, xp }, steps) => {
				setCurrentOpponent((current) => ({
					...current,
					dexId,
					xp,
					id: v4(),
					firstMove: {
						name: handledMoves[Math.floor(Math.random() * handledMoves.length)],
						usedPP: 0,
					},
					secondMove: {
						name: handledMoves[Math.floor(Math.random() * handledMoves.length)],
						usedPP: 0,
					},
					thirdMove: {
						name: handledMoves[Math.floor(Math.random() * handledMoves.length)],
						usedPP: 0,
					},
					fourthMove: {
						name: handledMoves[Math.floor(Math.random() * handledMoves.length)],
						usedPP: 0,
					},
					ability:
						abilityNames[Math.floor(Math.random() * abilityNames.length)],
					heldItemName: determineHeldItem(getHeldItemRateModifier(team[0])),
				}));

				navigateAwayFromOverworldReducer('BATTLE', steps);
			}}
			firstTeamMember={firstTeamMember}
			goToMarket={(i, steps) => {
				navigateAwayFromOverworldReducer('MARKET', steps);
				setCurrentMarketInventory(i);
			}}
			openStorage={(steps) =>
				navigateAwayFromOverworldReducer('STORAGE', steps)
			}
			talkToNurse={talkToNurseReducer}
			bushCutting={{
				cut: cutBushReducer,
				cutterPokemon: { dexId: team[0].dexId },
			}}
			cutBushes={saveFile.cutBushes}
		/>
	);
};
