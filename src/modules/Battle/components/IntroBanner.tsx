import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({ dexIds }: { dexIds: number[] }): JSX.Element => {
	return (
		<div
			style={{
				height: '100dvh',
				width: '100dvw',
				backgroundColor: 'white',
			}}
		>
			<Banner>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: '1rem',
						gap: '2rem',
					}}
				>
					Lets go!{' '}
					{dexIds.map((t) => (
						<img key={t} src={getPokemonSprite(t, 'back')} />
					))}
				</div>
			</Banner>
		</div>
	);
};
