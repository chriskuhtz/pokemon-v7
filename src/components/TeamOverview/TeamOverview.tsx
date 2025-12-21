import { useContext, useMemo } from 'react';
import { isOwnedPokemonKO } from '../../functions/isKo';
import { useGetBattleTeam } from '../../hooks/useGetBattleTeam';
import { useIsReadyToEvolve } from '../../hooks/useIsReadyToEvolve';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonSprite } from '../PokemonSprite/PokemonSprite';
import './TeamOverview.css';

export const TeamOverview = ({ steps }: { steps: number }) => {
	const {
		saveFile: { pokemon },
		navigateAwayFromOverworldReducer,
	} = useContext(SaveFileContext);
	const team = useMemo(() => pokemon.filter((p) => p.onTeam), [pokemon]);

	return (
		<>
			{team.map((t) => (
				<TeamMemberInOverview
					pokemon={t}
					key={t.id}
					onClick={() =>
						navigateAwayFromOverworldReducer({ activeTab: 'TEAM' }, steps)
					}
				/>
			))}
		</>
	);
};

const TeamMemberInOverview = ({
	pokemon,
	onClick,
}: {
	pokemon: OwnedPokemon;
	onClick: () => void;
}) => {
	const { res: battlePokemon } = useGetBattleTeam([pokemon], {});

	const readyToEvolve = useIsReadyToEvolve(pokemon, battlePokemon?.at(0)?.data);
	if (!battlePokemon) {
		return <></>;
	}

	return (
		<PokemonSprite
			className={readyToEvolve ? 'readyToEvolve' : undefined}
			onClick={onClick}
			name={pokemon.name}
			config={{ shiny: pokemon.shiny, grayscale: isOwnedPokemonKO(pokemon) }}
		/>
	);
};
