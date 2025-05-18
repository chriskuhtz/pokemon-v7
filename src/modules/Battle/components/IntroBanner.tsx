import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { PokemonName } from '../../../constants/pokemonNames';
import { useLocationColors } from '../../../hooks/useLocationColors';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	names,
}: {
	names: PokemonName[];
}): JSX.Element => {
	const { playerColor, oppColor } = useLocationColors();

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
