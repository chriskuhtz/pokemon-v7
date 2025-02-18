import { HpBar } from '../../../components/HpBar/HpBar';
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
					<img key={t.id} src={getPokemonSprite(t.dexId, 'back')} />
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
					<div
						style={{
							border: '1px solid black',
							padding: '0 2rem',
							borderRadius: 9000,
						}}
						key={t.id}
					>
						{t.data.name}
						<HpBar max={t.stats.hp} damage={t.damage} />
					</div>
				))}
			</div>
		</div>
	);
}
