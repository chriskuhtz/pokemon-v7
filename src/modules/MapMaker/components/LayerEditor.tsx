import React from 'react';
import { TileIdentifier } from '../../../interfaces/OverworldMap';
import { LayerName } from '../hooks/useMapEditor';

const unmemoedLayerEditor = ({
	layerName,
	layer,
	changeTile,
	addColumn,
	addRow,
	changeRow,
	changeColumn,
	randomFill,
	clear,
	tileSetUrl,
}: {
	layerName: LayerName;
	layer: (TileIdentifier | null)[][];
	addColumn: () => void;
	addRow: () => void;
	changeColumn: (index: number) => void;
	changeRow: (index: number) => void;
	changeTile: (i: number, j: number, layer: LayerName) => void;
	clear: () => void;
	randomFill: (layer: LayerName, percentage: number) => void;
	tileSetUrl: string;
}) => {
	return (
		<>
			<h3>
				{' '}
				{layerName !== 'Base' && (
					<button
						style={{ color: 'white', marginRight: '1rem' }}
						onClick={() => clear()}
					>
						clear
					</button>
				)}
				<button
					style={{ color: 'white', marginRight: '1rem' }}
					onClick={() => randomFill(layerName, 0.1)}
				>
					Random 10%
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
				<span></span> <span></span>
				<span></span>
				<div
					style={{
						cursor: 'default',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<div>X</div>
					{Array.from({ length: layer.length }).map((_, i) => (
						<div key={'row' + i} role={'button'} onClick={() => changeRow(i)}>
							{i}
						</div>
					))}
				</div>
				<LayerDisplay
					layer={layer}
					layerName={layerName}
					changeTile={changeTile}
					changeColumn={changeColumn}
					tileSetUrl={tileSetUrl}
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

export const LayerEditor = React.memo(unmemoedLayerEditor);

export const LayerDisplay = ({
	layerName,
	layer,
	changeTile,
	changeColumn,
	tileSetUrl,
}: {
	layerName: LayerName;
	layer: (TileIdentifier | null)[][];
	changeTile: (i: number, j: number, layer: LayerName) => void;
	changeColumn: (i: number, layer: LayerName) => void;
	tileSetUrl: string;
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
			{Array.from({ length: layer[0].length }).map((_, i) => (
				<div
					style={{
						height: 16,
						width: 16,
						border: '1px solid orange',
					}}
					key={'column' + i}
					role={'button'}
					onClick={() => changeColumn(i, layerName)}
				>
					{i}
				</div>
			))}
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
								background: `url(${tileSetUrl}) ${xOffset}px ${yOffset}px`,
							}}
						></div>
					);
				})
			)}
		</div>
	);
};
