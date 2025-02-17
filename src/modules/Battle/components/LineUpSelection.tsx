import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';

export const LineUpSelection = ({
	leave,
	opponents,
	team,
	fightersPerSide,
	toggleSelected,
	selectedTeam,
	startBattle,
}: {
	leave: () => void;
	opponents: BattlePokemon[];
	team: BattlePokemon[];
	fightersPerSide: number;
	selectedTeam: string[];
	toggleSelected: (id: string) => void;
	startBattle: () => void;
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
			<h2>
				Its {fightersPerSide} versus {fightersPerSide}
			</h2>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					justifyContent: 'flex-end',
				}}
			>
				{opponents.map((opponent) => (
					<div key={opponent.id}>
						<img src={getPokemonSprite(opponent.dexId)} />
						<br />
						<strong>{opponent.data.name}</strong>
					</div>
				))}
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				{team.map((teamMember) => (
					<div key={teamMember.id}>
						<img
							role="button"
							onClick={() => toggleSelected(teamMember.id)}
							tabIndex={0}
							style={{
								border: selectedTeam.includes(teamMember.id)
									? '2px solid black'
									: undefined,
								borderRadius: 9000,
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									toggleSelected(teamMember.id);
								}
							}}
							src={getPokemonSprite(teamMember.dexId, 'back')}
						/>
						<br />
						<strong>{teamMember.data.name}</strong>
					</div>
				))}
			</div>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<button onClick={leave}>Try to run</button>
				<button
					onClick={startBattle}
					disabled={selectedTeam.length !== fightersPerSide}
				>
					Battle
				</button>
			</div>
		</div>
	);
};
