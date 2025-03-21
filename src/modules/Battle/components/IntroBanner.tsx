import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { PokemonName } from '../../../constants/pokemonNames';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	names,
}: {
	names: PokemonName[];
}): JSX.Element => {
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
					{names.map((t) => (
						<PokemonSprite back name={t} key={t} />
					))}
				</div>
			</Banner>
		</div>
	);
};
