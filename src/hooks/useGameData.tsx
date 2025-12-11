import React, { ReactNode } from 'react';
import { GameData } from '../interfaces/GameData';

export const GameDataContext = React.createContext({} as GameData);

export const GameDataProvider = ({
	children,
	gameData,
}: {
	children: ReactNode;
	gameData: GameData;
}) => {
	return (
		<GameDataContext.Provider value={gameData}>
			{children}
		</GameDataContext.Provider>
	);
};
