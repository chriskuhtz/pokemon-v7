import { TileIdentifier } from '../../../interfaces/OverworldMap';
import { Tool } from '../MapMaker';

export const TileQuickSelection = ({
	usedTiles,
	setSelected,
}: {
	usedTiles: TileIdentifier[];
	setSelected: (x: Tool) => void;
}) => {
	return (
		<div
			style={{
				display: 'flex',
				gap: '1rem',
				padding: '1rem',
				alignItems: 'center',
			}}
		>
			{' '}
			<h4>Quick select:</h4>
			{usedTiles.map((ut, i) => (
				<div
					onClick={() => setSelected({ type: 'tileplacer', tile: ut })}
					key={ut.xOffset + ut.yOffset + i}
					style={{
						height: 16,
						width: 16,
						background: `url('/tilesets/masterSheet.png') ${ut.xOffset}px ${ut.yOffset}px`,
					}}
				></div>
			))}
			<button
				style={{ color: 'white', borderColor: 'white' }}
				onClick={() => setSelected({ type: 'eraser' })}
			>
				Eraser
			</button>
		</div>
	);
};
