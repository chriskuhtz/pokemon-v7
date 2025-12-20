import { Game } from '../../modules/Game/Game';
import { kumaDex } from './kumaDex';
import { startingSaveFileKuma } from './saveFile';
import { startingLocationKuma } from './startingLocation';

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
				quests: true,
				pokemonStorageSystem: true,
				movesEditableInTeamOverview: false,
				movesLearnableInTeamOverview: false,
				snapShotExportAvailable: false,
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
			carryingCapacity={{
				base: { amount: 20 },
				second: {
					amount: 30,
					condition: (s) => s.campUpgrades['bag size upgrade 1'],
				},
				third: {
					amount: 40,
					condition: (s) => s.campUpgrades['bag size upgrade 2'],
				},
				fourth: {
					amount: 50,
					condition: (s) => s.campUpgrades['bag size upgrade 3'],
				},
			}}
			teamSlots={{
				second: () => true,
				third: (s) => s.campUpgrades['team slot 3'],
				fourth: (s) => s.campUpgrades['team slot 4'],
				fifth: (s) => s.campUpgrades['team slot 5'],
				sixth: (s) => s.campUpgrades['team slot 6'],
			}}
			defaultBattleSize={2}
		/>
	);
};
