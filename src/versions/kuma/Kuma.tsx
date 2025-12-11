import {
	baseCampUpgrades,
	baseQuestState,
	emptyPokedex,
} from '../../constants/gameData/gameData';
import { EmptyInventory, generateInventory } from '../../interfaces/Inventory';
import { CharacterLocationData, SaveFile } from '../../interfaces/SaveFile';
import { Game } from '../../modules/Game/Game';

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
		/>
	);
};
