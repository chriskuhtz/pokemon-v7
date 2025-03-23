import { useContext, useMemo } from 'react';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { reduceBattlePokemonToOwnedPokemon } from '../../functions/reduceBattlePokemonToOwnedPokemon';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { useIsReadyToEvolve } from '../../hooks/useIsReadyToEvolve';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';
import './TeamOverview.css';

export const TeamOverview = ({ steps }: { steps: number }) => {
	const { saveFile, navigateAwayFromOverworldReducer } =
		useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);
	const { res: battleTeam } = useGetBattleTeam(
		team.map((t) => ({ ...t, caughtBefore: true })),
		{}
	);

	if (!battleTeam) {
		return <></>;
	}

	return (
		<>
			{battleTeam.map((t) => (
				<TeamMemberInOverview
					pokemon={reduceBattlePokemonToOwnedPokemon(t)}
					key={t.id}
					data={t.data}
					onClick={() => navigateAwayFromOverworldReducer('TEAM', steps)}
				/>
			))}
		</>
	);
};

export const TeamMemberInOverview = ({
	pokemon,
	data,
	onClick,
}: {
	pokemon: OwnedPokemon;
	data: PokemonData;
	onClick: () => void;
}) => {
	const readyToEvolve = useIsReadyToEvolve(pokemon, data);

	return (
		<PokemonSprite
			className={readyToEvolve ? 'readyToEvolve' : undefined}
			onClick={onClick}
			name={pokemon.name}
			shiny={pokemon.shiny}
			style={isOwnedPokemonKO(pokemon) ? { filter: 'grayscale(1)' } : undefined}
		/>
	);
};
