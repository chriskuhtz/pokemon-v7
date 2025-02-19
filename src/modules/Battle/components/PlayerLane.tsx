import { BattlePokemonInfo } from '../../../components/BattlePokemonInfo/BattlePokemonInfo';
import { baseSize } from '../../../constants/gameData';
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
			<div>
				{props.onFieldTeam.map((t) => (
					<img
						height={baseSize * 2}
						key={t.id}
						src={getPokemonSprite(t.dexId, 'back')}
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
