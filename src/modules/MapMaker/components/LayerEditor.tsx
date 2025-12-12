import React from 'react';
import {
	Occupant,
	TileIdentifier,
	TileMap,
} from '../../../interfaces/OverworldMap';

import { LayerName } from '../hooks/useMapEditor';
import { LayerDisplay } from './LayerDisplay';

const unmemoedLayerEditor = ({
	layerName,
	layer,
	changeTile,
	addColumn,
	addRow,
	changeRow,
	changeColumn,
	tileSetUrl,
	tileMap,
	occupants,
	opacity,
}: {
	layerName: LayerName;
	layer: (TileIdentifier | null)[][];
	addColumn: () => void;
	addRow: () => void;
	changeColumn: (index: number) => void;
	changeRow: (index: number) => void;
	changeTile: (i: number, j: number, layer: LayerName) => void;
	tileSetUrl: string;
	tileMap: TileMap;
	occupants: Occupant[];
	opacity: number;
}) => {
	return (
		<div
			style={{
				position: 'relative',
				overflow: 'scroll',
				color: 'white',
				backgroundColor: 'rgba(0,0,0,.8)',
				height: '100dvh',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					padding: '7rem 0',
					display: 'grid',
					gridTemplateColumns: '10fr 1fr',
					width: 'min-content',
					height: 'min-content',
				}}
			>
				<span></span> <span></span>
				<span></span>
				<span></span>
				<LayerDisplay
					layer={layer}
					layerName={layerName}
					changeTile={changeTile}
					changeColumn={changeColumn}
					changeRow={changeRow}
					tileSetUrl={tileSetUrl}
					tileMap={tileMap}
					occupants={occupants}
					opacity={opacity}
				/>
				<div style={{ border: '1px solid white' }} onClick={addColumn}>
					add Column
				</div>
				<div style={{ border: '1px solid white' }} onClick={addRow}>
					add Row
				</div>
			</div>
		</div>
	);
};

export const LayerEditor = React.memo(unmemoedLayerEditor);
