import { getRandomPokemonId } from './functions/getRandomPokemonId';
import { testState, useSaveFile } from './hooks/useSaveFile';
import { Bag } from './modules/Bag/Bag';
import { Battle } from './modules/Battle/Battle';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { Overworld } from './modules/Overworld/Overworld';
import { Team } from './modules/Team/Team';

const routes = [
	'OVERWORLD',
	'MAIN',
	'BAG',
	'TEAM',
	'BATTLE',
	'MARKET',
] as const;
export type RoutesType = (typeof routes)[number];

export const App = (): JSX.Element => {
	const {
		saveFile,
		discardItemReducer,
		putSaveFileReducer,
		setActiveTabReducer,
	} = useSaveFile(testState, true);

	const { activeTab } = saveFile.meta;

	if (activeTab === 'OVERWORLD') {
		return <Overworld openMenu={() => setActiveTabReducer('MAIN')} />;
	}

	if (activeTab === 'BAG') {
		return (
			<Bag
				inventory={saveFile.inventory}
				discardItem={discardItemReducer}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				team={saveFile.pokemon.filter((p) => p.onTeam)}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}
	if (activeTab === 'BATTLE') {
		return (
			<Battle
				initSaveFile={saveFile}
				syncAfterBattleEnd={putSaveFileReducer}
				opponent={{ dexId: getRandomPokemonId() }}
				goBack={() => setActiveTabReducer('MAIN')}
			/>
		);
	}

	return (
		<MainMenu
			goBack={() => setActiveTabReducer('OVERWORLD')}
			navigate={(x) => {
				if (!routes.some((r) => r === x)) {
					return;
				}
				setActiveTabReducer(x as RoutesType);
			}}
		/>
	);
};
