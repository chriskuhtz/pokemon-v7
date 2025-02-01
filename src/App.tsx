import { useState } from 'react';
import { useSaveFile } from './hooks/useSaveFile';
import { Bag } from './modules/Bag/Bag';
import { MainMenu } from './modules/MainMenu/MainMenu';
import { Team } from './modules/Team/Team';

const routes = ['MAIN', 'BAG', 'TEAM', 'BATTLE'] as const;
type RoutesType = (typeof routes)[number];

export const App = (): JSX.Element => {
	const [activeTab, setActiveTab] = useState<RoutesType>(routes[0]);
	const { saveFile, discardItemReducer } = useSaveFile();

	if (activeTab === 'BAG') {
		return (
			<Bag
				inventory={saveFile.inventory}
				discardItem={discardItemReducer}
				goBack={() => setActiveTab('MAIN')}
			/>
		);
	}
	if (activeTab === 'TEAM') {
		return (
			<Team
				team={saveFile.pokemon.filter((p) => p.onTeam)}
				goBack={() => setActiveTab('MAIN')}
			/>
		);
	}

	return (
		<MainMenu
			navigate={(x) => {
				if (!routes.some((r) => r === x)) {
					return;
				}
				setActiveTab(x as RoutesType);
			}}
		/>
	);
};
