import { useContext, useMemo } from 'react';
import { baseSize } from '../../constants/gameData';
import { getPokemonSprite } from '../../functions/getPokemonSprite';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { SaveFileContext } from '../../hooks/useSaveFile';

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
					height={baseSize / 2}
					width={baseSize / 2}
					src={getPokemonSprite(t.dexId)}
					style={isOwnedPokemonKO(t) ? { filter: 'grayscale(1)' } : undefined}
				/>
			))}
		</>
	);
};
