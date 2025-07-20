import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { PokemonSprite } from '../../../components/PokemonSprite/PokemonSprite';
import { portraitMode } from '../../../constants/gameData/gameData';
import { getSizeFactor } from '../../../functions/getSizeFactor';
import { useLocationBattlePlatform } from '../../../hooks/useLocationColors';
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
				}}
			>
				{props.onFieldTeam.map((t) => (
					<PokemonSprite
						key={t.id}
						name={t.name}
						config={{ shiny: t.shiny, back: true }}
						style={{ margin: '2rem 1rem' }}
						sizeFactor={getSizeFactor(t.data.height)}
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
