import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { battleSpriteSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function PlayerLane(props: { onFieldTeam: BattlePokemon[] }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					backgroundImage: "url('/battlePlatforms/grass.png')",
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
					minWidth: '300px',
					justifyContent: 'center',
				}}
			>
				{props.onFieldTeam.map((t) => (
					<img
						height={battleSpriteSize}
						style={{ margin: '2rem 1rem' }}
						key={t.id}
						src={getPokemonSprite(t.name, 'back')}
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
