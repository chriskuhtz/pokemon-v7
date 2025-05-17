import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { PokemonName } from '../../../constants/pokemonNames';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	names,
	playerColor,
	oppColor,
}: {
	names: PokemonName[];
	oppColor: string;
	playerColor: string;
}): JSX.Element => {
	return (
		<div style={{ backgroundColor: 'white' }}>
			<div
				style={{
					height: '100dvh',
					width: '100dvw',
					background: `linear-gradient(
					218deg,
					${oppColor} 0%,
					${playerColor} 100%`,
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
