import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { getItemUrl } from '../../functions/getItemUrl';
import { useNavigate } from '../../hooks/useNavigate';
import { fossilTable } from '../../interfaces/Item';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { useFossils } from './hooks/useFossils';

export const FossilReviver = (): JSX.Element => {
	const navigate = useNavigate();
	const { fossils, revive } = useFossils();
	return (
		<Page
			headline="Fossil Reviver"
			goBack={() => navigate('FOSSIL_REVIVER', 'OVERWORLD')}
		>
			<Stack mode="column">
				{fossils.length > 0
					? fossils.map(([f]) => (
							<Card
								key={f}
								icon={<img src={getItemUrl(f)} />}
								onClick={() => {
									revive(f);
								}}
								content={
									<h3>
										Revive <PokemonSprite name={fossilTable[f]} /> for 5
										Research Points
									</h3>
								}
								actionElements={[]}
							/>
					  ))
					: [
							<Card
								key="no-fossils"
								icon={<img src={getItemUrl('helix-fossil')} />}
								content={'Try to find some fossils in caves'}
								actionElements={[]}
							/>,
					  ]}
			</Stack>
		</Page>
	);
};
