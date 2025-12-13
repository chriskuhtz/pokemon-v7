import {
	baseCampUpgrades,
	baseQuestState,
	emptyPokedex,
} from '../../constants/gameData/gameData';
import { EmptyInventory, generateInventory } from '../../interfaces/Inventory';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import { Game } from '../../modules/Game/Game';
import { kumaDex } from './kumaDex';

const startingLocationKuma: CharacterLocationData = {
	mapId: 'camp',
	orientation: 'DOWN',
	forwardFoot: 'CENTER1',
	x: 20,
	y: 18,
};

const startingSaveFileKuma: SaveFile = {
	sprite: '',
	badges: [],
	researchPoints: 0,
	quests: baseQuestState,

	bag: EmptyInventory,
	storage: generateInventory({
		'berry-juice': 5,
		'poke-ball': 20,
	}),

	seedVault: [],
	playerId: '',
	money: 5000,
	pokemon: [],
	meta: {
		activeTab: 'MAIN',
	},
	handledOccupants: [],
	lastEdited: new Date().getTime(),
	lastNurse: 'nurse_Pokecenter_Camp',
	mileStones: {
		hasEvolvedAPokemonThroughLevelUp: false,
		hasEvolvedAPokemonWithAHeldItem: false,
		hasEvolvedAPokemonWithAStone: false,
		hasCaughtAPokemonWithHoney: false,
		hasEvolvedAPokemonThroughFriendship: false,
		hasEvolvedAPokemonThatNeedsDaytime: false,
		hasEvolvedAPokemonThatNeedsNighttime: false,
		hasCraftedApricorn: false,
		hasGrownABerry: false,
		hasGrownAnApricorn: false,
		caughtFromSwarms: [],
		luredWithBerries: [],
		damageRecord: 0,
	},
	farm: { plants: [] },
	campUpgrades: baseCampUpgrades,
	pokedex: emptyPokedex,
};
export const Kuma = (): JSX.Element => {
	return (
		<Game
			saveFileId="pokemonv7SaveFile"
			locationId="pokemonv7Location"
			startingLocation={startingLocationKuma}
			startingTab={'SETTINGS'}
			startingRouterSequence={[
				{ route: 'SETTINGS', condition: (s) => !s.settings },
				{
					route: 'SPRITE_SELECTION',
					condition: (s) => !!(s.settings && s.sprite === ''),
				},
				{
					route: 'STARTER_SELECTION',
					condition: (saveFile) =>
						!!(
							saveFile.settings &&
							saveFile.sprite &&
							(saveFile.playerId === '' || saveFile.pokemon.length === 0)
						),
				},
			]}
			startingSaveFile={startingSaveFileKuma}
			allowedBaseSizes={[16, 32, 64, 128, 256]}
			internalDex={kumaDex}
			features={{
				settingsEditable: true,
				catchStreaks: true,
				numberOfBallsBadge: true,
			}}
			losingMessages={{
				training: 'luckily this was only a training battle',
				wild: 'You lost the battle and rushed back to camp, loosing your items on the way',
				reset: 'You lost the battle and have to reset',
			}}
			overworldActions={{
				bushCutting: {
					possible: (saveFile) =>
						saveFile.campUpgrades['machete certification'],
					successDialogue: ['You use your certified machete skills'],
					failDialogue: [
						'You need a machete certification to cut bushes',
						'...bureaucracy',
					],
				},
			}}
		/>
	);
};
