import { TileIdentifier } from '../../../interfaces/OverworldMap';

export const LayerEditor = ({
	layerName,
	layer,
	changeTile,
	addColumn,
	addRow,
}: {
	layerName: 'Base' | 'Obstacle' | 'Decoration';
	layer: (TileIdentifier | undefined)[][];
	addColumn: () => void;
	addRow: () => void;
	changeTile: (
		i: number,
		j: number,
		layer: 'Base' | 'Obstacle' | 'Decoration'
	) => void;
}) => {
	return (
		<>
			<h3>{layerName}:</h3>
			<div
				style={{
					padding: '2rem',
					display: 'grid',
					gridTemplateColumns: '10fr 1fr',
				}}
			>
				<LayerDisplay
					layer={layer}
					layerName={layerName}
					changeTile={changeTile}
				/>
				<div style={{ border: '1px solid white' }} onClick={addColumn}>
					add Column
				</div>
				<div style={{ border: '1px solid white' }} onClick={addRow}>
					add Row
				</div>
			</div>
		</>
	);
};

export const LayerDisplay = ({
	layerName,
	layer,
	changeTile,
}: {
	layerName: 'Base' | 'Obstacle' | 'Decoration';
	layer: (TileIdentifier | undefined)[][];

	changeTile: (
		i: number,
		j: number,
		layer: 'Base' | 'Obstacle' | 'Decoration'
	) => void;
}) => {
	return (
		<div
			style={{
				scale: 1,
				width: 'min-content',
				display: 'grid',
				justifyItems: 'flex-start',
				gridTemplateColumns: `${Array.from({
					length: layer[0].length,
				})
					.map(() => '1fr')
					.join(' ')}`,
				gap: '2px',
			}}
		>
			{layer.map((row, i) =>
				row.map((el, j) => {
					const { yOffset, xOffset } = el ?? {};
					return (
						<div
							onClick={() => changeTile(i, j, layerName)}
							key={'newMap' + Math.random()}
							style={{
								height: 16,
								width: 16,
								border: '1px solid red',
								background: `url(/tilesets/fireRedBase.png) ${xOffset}px ${yOffset}px`,
							}}
						></div>
					);
				})
			)}
		</div>
	);
};
