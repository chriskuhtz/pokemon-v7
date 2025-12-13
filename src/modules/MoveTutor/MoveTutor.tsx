import { useContext, useMemo, useState } from 'react';
import { MoveEditor } from '../../components/MoveEditor/MoveEditor';
import { MovesDisplay } from '../../components/OwnedPokemonCard/components/MovesDisplay';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const MoveTutor = () => {
	const { saveFile } = useContext(SaveFileContext);
	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile]
	);

	const [id, setId] = useState<string>(team[0].id);

	const pokemonWithId = useMemo(
		() => team.find((t) => t.id === id),
		[id, team]
	);

	const navigate = useNavigate();
	return (
		<Page
			headline="Move Tutor"
			goBack={() => navigate('MOVE_TUTOR', 'OVERWORLD')}
		>
			<Stack mode="column">
				{!id && <strong>Which Pokemon should I teach a move to?</strong>}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
						padding: '2rem',
						columnGap: '1rem',
					}}
				>
					{team.map((t) => (
						<PokemonSprite
							key={t.id}
							onClick={() => setId(t.id)}
							name={t.name}
							sizeFactor={id === t.id ? 3 : 1}
							config={{ officalArtwork: true, shiny: t.shiny }}
						/>
					))}
				</div>
				{pokemonWithId && (
					<>
						<h2>Choose Active Moves:</h2>
						<MovesDisplay ownedPokemon={pokemonWithId} />
						<h2>Learn new Moves:</h2>
						<MoveEditor ownedPokemon={pokemonWithId} />
					</>
				)}
			</Stack>
		</Page>
	);
};
