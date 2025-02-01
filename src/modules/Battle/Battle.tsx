import { useEffect, useState } from 'react';
import { IntroBanner } from '../../components/IntroBanner/IntroBanner';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { useGetPokemonData } from '../../hooks/useGetPokemonData';
import { SaveFile } from '../../hooks/useSaveFile';
import { Inventory } from '../../interfaces/Inventory';
import { LoadingScreen } from '../../uiComponents/LoadingScreen/LoadingScreen';

export interface Opponent {
	dexId: number;
}

export const Battle = ({
	team,
	opponent,
}: {
	team: SaveFile['pokemon'];
	inventory: Inventory;
	opponent: Opponent;
	goBack: () => void;
}): JSX.Element => {
	const [introHandled, setIntroHandled] = useState(false);
	const { res: opponentData } = useGetPokemonData(opponent.dexId);
	const { res: playerData } = useGetPokemonData(team[0].dexId);

	useEffect(() => console.log(introHandled), [introHandled]);

	useEffect(() => {
		if (!opponentData || !playerData || introHandled) {
			return;
		}
		const t = setTimeout(() => setIntroHandled(true), 1500);

		return () => clearTimeout(t);
	}, [introHandled, opponentData, playerData]);

	if (!opponentData || !playerData) {
		return <LoadingScreen />;
	}

	return (
		<div>
			{!introHandled && (
				<IntroBanner
					name={opponentData.name}
					sprite={<img src={getPokemonSprite(opponent.dexId)} />}
				/>
			)}
		</div>
	);
};
