import { baseSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { Challenger } from '../../../interfaces/Challenger';
import { Banner } from '../../../uiComponents/Banner/Banner';

export const IntroBanner = ({
	player,
	opponent,
}: {
	player: Challenger;
	opponent: Challenger;
}): JSX.Element => {
	return (
		<Banner>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					{player.team.map((t) => (
						<img
							height={baseSize}
							width={baseSize}
							src={getPokemonSprite(t.dexId)}
						/>
					))}
				</div>
				<h2 style={{ padding: '0 12rem' }}>
					{player.id} VS{' '}
					{opponent.type === 'WILD' ? 'Wild Pokemon' : `Trainer ${opponent.id}`}
				</h2>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					{opponent.team.map((t) => (
						<img
							height={baseSize}
							width={baseSize}
							src={getPokemonSprite(t.dexId)}
						/>
					))}
				</div>
			</div>
		</Banner>
	);
};
