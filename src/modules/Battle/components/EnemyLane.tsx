import { HpBar } from '../../../components/HpBar/HpBar';
import { baseSize } from '../../../constants/gameData';
import { getItemUrl } from '../../../functions/getItemUrl';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export function EnemyLane({
	onFieldOpponents,
}: {
	onFieldOpponents: BattlePokemon[];
}) {
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
					gap: '.5rem',
				}}
			>
				{onFieldOpponents.map((t) => (
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
			<div>
				{onFieldOpponents.map((t) => {
					if (t.status === 'CAUGHT') {
						return (
							<img height={baseSize} key={t.id} src={getItemUrl('poke-ball')} />
						);
					}
					return (
						<img
							height={baseSize * 2}
							key={t.id}
							src={getPokemonSprite(t.dexId)}
						/>
					);
				})}
			</div>
		</div>
	);
}
