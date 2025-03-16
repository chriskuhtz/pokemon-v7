import { useMemo } from 'react';
import { Sprite } from '../../../components/Sprite/Sprite';
import { battleSpriteSize } from '../../../constants/gameData';
import { getPokemonSprite } from '../../../functions/getPokemonSprite';
import { isKO } from '../../../functions/isKo';
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
	const battleButtonMessage = useMemo(() => {
		if (selectedTeam.length < fightersPerSide)
			return `select ${fightersPerSide - selectedTeam.length} more`;

		if (selectedTeam.length > fightersPerSide)
			return `select ${fightersPerSide - selectedTeam.length} less`;

		return 'Battle';
	}, [fightersPerSide, selectedTeam.length]);

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				height: '100dvh',
				justifyItems: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
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
					<img key={opponent.id} src={getPokemonSprite(opponent.name)} />
				))}
			</div>
			<div
				style={{
					display: 'grid',
					alignItems: 'center',
					justifyContent: 'center',
					gridTemplateColumns: '1fr 1fr 1fr',
					columnGap: '2rem',
					rowGap: '.5rem',
				}}
			>
				{team
					.filter((t) => !isKO(t))
					.map((teamMember) => (
						<div
							role="button"
							onClick={() => toggleSelected(teamMember.id)}
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									toggleSelected(teamMember.id);
								}
							}}
							key={teamMember.id}
							style={{
								border: selectedTeam.includes(teamMember.id)
									? '2px solid black'
									: undefined,
								borderRadius: 9000,
								aspectRatio: '1/1',
								padding: '1rem',
							}}
						>
							<img
								style={{
									filter: isKO(teamMember) ? 'grayscale(1)' : undefined,
								}}
								height={battleSpriteSize}
								src={getPokemonSprite(teamMember.name, 'back')}
							/>
						</div>
					))}
			</div>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<button
					autoFocus
					onClick={startBattle}
					disabled={selectedTeam.length !== fightersPerSide}
				>
					{battleButtonMessage}
				</button>
				<button onClick={leave}>Try to escape</button>
			</div>
		</div>
	);
};
