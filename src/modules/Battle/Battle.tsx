import { IntroBanner } from '../../components/IntroBanner/IntroBanner';
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
	const { res: opponentData } = useGetPokemonData(opponent.dexId);
	const { res: playerData } = useGetPokemonData(team[0].dexId);

	if (!opponentData || !playerData) {
		return <LoadingScreen />;
	}

	return (
		<div>
			<IntroBanner
				opponent={{ dexId: opponent.dexId, name: opponentData.name }}
				player={{ dexId: team[0].dexId, name: playerData.name }}
			/>
		</div>
	);
};
