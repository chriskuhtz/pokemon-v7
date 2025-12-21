import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { AnimatedSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { portraitMode } from '../../../constants/gameData/gameData';
import { getSizeFactor } from '../../../functions/getSizeFactor';
import { useLocationBattlePlatform } from '../../../hooks/useLocationColors';
import '../../../index.css';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function PlayerLane(props: { onFieldTeam: BattlePokemon[] }) {
	const platform = useLocationBattlePlatform();
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: portraitMode ? 'flex-end' : 'space-between',
				alignItems: portraitMode ? 'flex-start' : 'center',
				flexDirection: portraitMode ? 'column' : 'row',
				padding: portraitMode ? undefined : '0 1rem',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					backgroundImage: `url('/battlePlatforms/${platform}.png')`,
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
					minWidth: '300px',
					justifyContent: 'center',
					height: 100,
				}}
			>
				{props.onFieldTeam.map((t) => (
					<AnimatedSprite
						key={t.id}
						name={t.name}
						config={{ shiny: t.shiny, back: true }}
						style={{ margin: '2rem 1rem' }}
						sizeFactor={getSizeFactor(t.data.height)}
						animation={t.animation}
					/>
				))}
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '.5rem',
				}}
			>
				{props.onFieldTeam.map((t) => (
					<BattlePokemonInfo pokemon={t} key={t.id} />
				))}
			</div>
		</div>
	);
}
