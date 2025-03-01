import { TileIdentifier } from '../../../interfaces/OverworldMap';
import { LayerName } from '../hooks/useMapEditor';

export const LayerEditor = ({
	layerName,
	layer,
	changeTile,
	addColumn,
	addRow,
	clear,
	changeRow,
	changeColumn,
}: {
	layerName: LayerName;
	layer: (TileIdentifier | null)[][];
	addColumn: () => void;
	addRow: () => void;
	changeColumn: (index: number) => void;
	changeRow: (index: number) => void;
	changeTile: (i: number, j: number, layer: LayerName) => void;
	clear: () => void;
}) => {
	return (
		<>
			<h3>
				<button style={{ color: 'white', marginRight: '1rem' }} onClick={clear}>
					Clear
				</button>
				{layerName}:
			</h3>
			<div
				style={{
					padding: '2rem',
					display: 'grid',
					gridTemplateColumns: '1fr 10fr 1fr',
				}}
			>
				<span></span>{' '}
				<div
					style={{
						cursor: 'default',
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
					{Array.from({ length: layer[0].length }).map((_, i) => (
						<div role={'button'} onClick={() => changeColumn(i)}>
							{i}
						</div>
					))}
				</div>
				<span></span>
				<div
					style={{
						cursor: 'default',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{Array.from({ length: layer.length }).map((_, i) => (
						<div role={'button'} onClick={() => changeRow(i)}>
							{i}
						</div>
					))}
				</div>
				<LayerDisplay
					layer={layer}
					layerName={layerName}
					changeTile={changeTile}
				/>
				<div style={{ border: '1px solid white' }} onClick={addColumn}>
					add Column
				</div>
				<span></span>
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
	layerName: LayerName;
	layer: (TileIdentifier | null)[][];
	changeTile: (i: number, j: number, layer: LayerName) => void;
}) => {
	return (
		<div
			style={{
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
