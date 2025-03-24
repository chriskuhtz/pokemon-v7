import { useContext } from 'react';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { PokemonName } from '../../constants/pokemonNames';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';

export const Pokedex = () => {
	const { saveFile } = useContext(SaveFileContext);

	const navigate = useNavigate();

	return (
		<Page headline="Pokedex" goBack={() => navigate('POKEDEX', 'OVERWORLD')}>
			<Stack mode="column">
				{Object.entries(saveFile.pokedex).map(
					([name, { seenOnRoutes, caughtOnRoutes }]) => {
						if (seenOnRoutes.length > 0) {
							return (
								<Card
									key={name}
									icon={
										<PokemonSprite
											name={name as PokemonName}
											sizeFactor={3}
											config={{
												grayscale: caughtOnRoutes.length === 0,
												officalArtwork: true,
											}}
										/>
									}
									content={
										<div>
											<h3>{name}</h3>
											<strong>Seen at: {seenOnRoutes.join(', ')}</strong>
											<br />
											<strong>Caught at: {caughtOnRoutes.join(', ')}</strong>
										</div>
									}
									actionElements={[]}
								/>
							);
						}
					}
				)}
			</Stack>
		</Page>
	);
};
