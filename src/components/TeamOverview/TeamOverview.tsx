import { useContext, useMemo } from 'react';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { battleSpriteSize } from '../../constants/gameData';

export const TeamOverview = () => {
	const { saveFile } = useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	return (
		<>
			{team.map((t) => (
				<img
					key={t.id}
					height={battleSpriteSize}
					width={battleSpriteSize}
					src={getPokemonSprite(t.dexId)}
					style={isOwnedPokemonKO(t) ? { filter: 'grayscale(1)' } : undefined}
				/>
			))}
		</>
	);
};
