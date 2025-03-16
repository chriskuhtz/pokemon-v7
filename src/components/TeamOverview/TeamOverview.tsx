import { useContext, useMemo } from 'react';
import { battleSpriteSize } from '../../constants/gameData';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { SaveFileContext } from '../../hooks/useSaveFile';

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
				<img
					onClick={() => navigateAwayFromOverworldReducer('TEAM', steps)}
					key={t.id}
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(t.name)}
					style={isOwnedPokemonKO(t) ? { filter: 'grayscale(1)' } : undefined}
				/>
			))}
		</>
	);
};
