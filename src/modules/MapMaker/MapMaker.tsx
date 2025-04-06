import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MapId, mapsRecord } from '../../constants/maps/mapsRecord';
import { TileIdentifier } from '../../interfaces/OverworldMap';
import { MapEditor } from './components/MapEditor';
import { LayerName } from './hooks/useMapEditor';

export const BaseSize = 16;
export interface TilePlacer {
	type: 'tileplacer';
	tile: TileIdentifier;
}
export interface Eraser {
	type: 'eraser';
}
export type Tool = TilePlacer | Eraser;

export const MapMaker = ({
	goBack,
	mapId,
	tileSetUrl,
}: {
	goBack: () => void;
	mapId: MapId;
	tileSetUrl: string;
}) => {
	const [selected, setSelected] = useState<Tool | undefined>();

	const [activeTab, setActiveTab] = useState<LayerName>('Base');

	return (
		<div
			style={{
				color: 'white',
				backgroundColor: 'rgba(0,0,0,.8)',
			}}
		>
			<h2
				style={{
					marginTop: 0,
					color: 'wheat',
					display: 'flex',
					alignItems: 'center',
					gap: '2rem',
				}}
			>
				{' '}
				<IoIosArrowBack role="button" tabIndex={0} onClick={goBack} />
				Selected Tool:{' '}
				{selected?.type === 'tileplacer' && (
					<div
						style={{
							scale: 2,
							height: 16,
							width: 16,
							background: `url(${tileSetUrl}) ${selected.tile.xOffset}px ${selected.tile.yOffset}px`,
						}}
					></div>
				)}
				{selected?.type === 'eraser' && 'Eraser'}
				{!selected && '-'}
			</h2>
			<div>
				<MapEditor
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					tool={selected}
					setSelected={setSelected}
					initialMap={mapsRecord[mapId]}
				/>
			</div>
		</div>
	);
};
