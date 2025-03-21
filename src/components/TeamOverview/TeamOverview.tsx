import { useContext, useMemo } from 'react';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';

export const TeamOverview = ({ steps }: { steps: number }) => {
	const { saveFile, navigateAwayFromOverworldReducer } =
		useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	return (
		<>
			{team.map((t) => (
				<PokemonSprite
					onClick={() => navigateAwayFromOverworldReducer('TEAM', steps)}
					key={t.id}
					name={t.name}
					style={isOwnedPokemonKO(t) ? { filter: 'grayscale(1)' } : undefined}
				/>
			))}
		</>
	);
};
