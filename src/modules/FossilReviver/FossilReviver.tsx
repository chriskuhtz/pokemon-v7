import { useContext } from 'react';
import { ItemSprite } from '../../components/ItemSprite/ItemSprite';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { PokemonName } from '../../constants/pokemonNames';
import { useNavigate } from '../../hooks/useNavigate';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { fossilTable } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useFossils } from './hooks/useFossils';

export const FossilReviver = (): JSX.Element => {
	const navigate = useNavigate();
	const { revive } = useFossils();
	const {
		saveFile: { pokedex, bag },
	} = useContext(SaveFileContext);
	return (
		<Page
			headline="Fossil Reviver"
			goBack={() => navigate('FOSSIL_REVIVER', 'OVERWORLD')}
		>
			<Stack mode="column">
				{Object.values(fossilTable).map((requiredFossils) => {
					const fossil = Object.entries(fossilTable).find(([, fossils]) =>
						fossils.every((rf) => requiredFossils.includes(rf))
					);

					if (!fossil) {
						console.error(
							'what are these fossils supposed to yield?',
							requiredFossils
						);
						return;
					}
					const pokemon = fossil[0] as PokemonName;

					return (
						<Card
							key={requiredFossils.join()}
							icon={
								pokedex[pokemon].caughtOnRoutes.length === 0 ? (
									<ItemSprite item="poke-ball" />
								) : (
									<PokemonSprite name={pokemon} />
								)
							}
							disabled={!requiredFossils.every((f) => bag[f] > 0)}
							onClick={() => {
								revive(requiredFossils);
							}}
							content={<h3>Revive</h3>}
							actionElements={requiredFossils.map((f) => (
								<ItemSprite item={f} />
							))}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};
