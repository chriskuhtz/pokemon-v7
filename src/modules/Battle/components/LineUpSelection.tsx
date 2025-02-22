import { Sprite } from '../../../components/Sprite/Sprite';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { OverworldTrainer } from '../../../interfaces/OverworldMap';

export const LineUpSelection = ({
	leave,
	opponents,
	team,
	fightersPerSide,
	toggleSelected,
	selectedTeam,
	startBattle,
	trainer,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
	selectedTeam: string[];
	toggleSelected: (id: string) => void;
	startBattle: () => void;
	trainer?: OverworldTrainer;
}) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				height: '100dvh',
				justifyItems: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					border: '2px solid black',
					borderRadius: '.5rem',
					padding: '0 1rem',
				}}
			>
				{trainer ? (
					<h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						{' '}
						VS {trainer.name} <Sprite id={trainer.sprite} rotating={false} />
					</h2>
				) : (
					<h2>VS Wild Pokemon</h2>
				)}
				<h2>
					Its {fightersPerSide} v {fightersPerSide}
				</h2>
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					justifyContent: 'flex-end',
				}}
			>
				{opponents.map((opponent) => (
					<img key={opponent.id} src={getPokemonSprite(opponent.dexId)} />
				))}
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				{team.map((teamMember) => (
					<div
						role="button"
						onClick={() => toggleSelected(teamMember.id)}
						tabIndex={0}
						style={{
							border: selectedTeam.includes(teamMember.id)
								? '2px solid black'
								: undefined,
							borderRadius: 9000,
							aspectRatio: '1/1',
							padding: '1rem',
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								toggleSelected(teamMember.id);
							}
						}}
						key={teamMember.id}
					>
						<img src={getPokemonSprite(teamMember.dexId, 'back')} />
						<br />
						<strong>{teamMember.data.name}</strong>
					</div>
				))}
			</div>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<button
					onClick={startBattle}
					disabled={selectedTeam.length !== fightersPerSide}
				>
					{selectedTeam.length == fightersPerSide && 'Battle'}
					{selectedTeam.length < fightersPerSide &&
						`select ${fightersPerSide - selectedTeam.length} more`}
					{selectedTeam.length > fightersPerSide &&
						`select ${fightersPerSide - selectedTeam.length} less`}
				</button>
				<button onClick={leave}>Try to run</button>
			</div>
		</div>
	);
};
