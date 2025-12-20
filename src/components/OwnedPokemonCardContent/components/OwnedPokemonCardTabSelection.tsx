import { useLearnableMoves } from '../../../hooks/useLearnableMoves';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../interfaces/PokemonData';
import { SelectionBar } from '../../../uiComponents/SelectionBar/SelectionBar';
import { gameData } from '../../../versions/labyrinth/gameData';

const tabTypes = [
	'DETAILS',
	'HELD ITEM',
	'STATS',
	'EVOLUTION',
	'MOVES',
	'NEW MOVES',
	'APPLY ITEM',
] as const;
export type TabType = (typeof tabTypes)[number];

const useNewMovesLabel = (
	ownedPokemon: OwnedPokemon,
	data: PokemonData
): string => {
	const learnableMoves = useLearnableMoves(ownedPokemon, data);

	const numberOfLearnableMoves = learnableMoves.filter(
		(l) =>
			l.learnable && !ownedPokemon.unlockedMoves.some((m) => m === l.move.name)
	).length;
	return `NEW MOVES (${numberOfLearnableMoves})`;
};

export const OwnedPokemonCardTabSelection = ({
	ownedPokemon,
	data,
	tab,
	setTab,
}: {
	ownedPokemon: OwnedPokemon;
	data: PokemonData;
	tab: TabType;
	setTab: (x: TabType) => void;
}): JSX.Element => {
	const newMovesLabel = useNewMovesLabel(ownedPokemon, data);
	return (
		<SelectionBar
			allowUndefined={false}
			options={[...tabTypes]
				.filter((t) => {
					if (t === 'NEW MOVES') {
						return gameData.features.movesLearnableInTeamOverview;
					}
					return true;
				})
				.map((o) => {
					if (o === 'NEW MOVES') {
						return { key: o, label: newMovesLabel };
					}
					return { key: o, label: o };
				})}
			selected={tab}
			select={(x) => setTab(x as TabType)}
		/>
	);
};
