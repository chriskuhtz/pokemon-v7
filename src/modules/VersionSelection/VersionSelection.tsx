import { useState } from 'react';
import { PokemonSprite } from '../../components/PokemonSprite/PokemonSprite';
import { Card } from '../../uiComponents/Card/Card';
import { Page } from '../../uiComponents/Page/Page';
import { Stack } from '../../uiComponents/Stack/Stack';
import { Kuma } from '../../versions/kuma/Kuma';
import { Labyrinth } from '../../versions/labyrinth/Labyrinth';

export const VersionSelection = (): JSX.Element => {
	const [version, setVersion] = useState<'KUMA' | 'LABYRINTH'>();

	if (version === 'KUMA') {
		return <Kuma />;
	}
	if (version === 'LABYRINTH') {
		return <Labyrinth />;
	}
	return (
		<Page headline={'Which version would you like to play'}>
			<Stack mode={'column'}>
				<Card
					icon={
						<PokemonSprite
							config={{ officalArtwork: true }}
							name={'teddiursa'}
						/>
					}
					content={<h3>Kuma</h3>}
					actionElements={[]}
					onClick={() => setVersion('KUMA')}
				></Card>
				<Card
					icon={
						<PokemonSprite config={{ officalArtwork: true }} name={'unown'} />
					}
					content={<h3>Labyrinth</h3>}
					actionElements={[]}
					onClick={() => setVersion('LABYRINTH')}
				></Card>
			</Stack>
		</Page>
	);
};
