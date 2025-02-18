import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({ dexIds }: { dexIds: number[] }): JSX.Element => {
	return (
		<Banner>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				Lets go!{' '}
				{dexIds.map((t) => (
					<img key={t} src={getPokemonSprite(t, 'back')} />
				))}
			</div>
		</Banner>
	);
};
