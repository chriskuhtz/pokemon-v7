import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { portraitMode } from '../../../constants/gameData/gameData';
import { PokemonName } from '../../../constants/pokemonNames';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	names,
}: {
	names: PokemonName[];
}): JSX.Element => {
	return (
		<div style={{ backgroundColor: 'white' }}>
			<div
				style={{
					height: '100dvh',
					width: '100dvw',
					backgroundImage: portraitMode
						? `url("/backgrounds/forestMobile.png")`
						: `url("/backgrounds/forestDesktop.png")`,
					backgroundSize: 'cover',
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
						{names.map((t) => (
							<PokemonSprite config={{ back: true }} name={t} key={t} />
						))}
					</div>
				</Banner>
			</div>
		</div>
	);
};
