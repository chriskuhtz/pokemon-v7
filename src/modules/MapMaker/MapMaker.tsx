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
export interface TwoByTwoGroup {
	type: 'twoByTwoPlacer';
	tile1: TileIdentifier;
	tile2: TileIdentifier;
	tile3: TileIdentifier;
	tile4: TileIdentifier;
}
export type Tool = TilePlacer | Eraser | TwoByTwoGroup;

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
				{selected?.type === 'twoByTwoPlacer' && (
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
						<div
							style={{
								scale: 2,
								height: 16,
								width: 16,
								background: `url(${tileSetUrl}) ${selected.tile1.xOffset}px ${selected.tile1.yOffset}px`,
							}}
						/>
						<div
							style={{
								scale: 2,
								height: 16,
								width: 16,
								background: `url(${tileSetUrl}) ${selected.tile2.xOffset}px ${selected.tile2.yOffset}px`,
							}}
						/>
						<div
							style={{
								scale: 2,
								height: 16,
								width: 16,
								background: `url(${tileSetUrl}) ${selected.tile3.xOffset}px ${selected.tile3.yOffset}px`,
							}}
						/>
						<div
							style={{
								scale: 2,
								height: 16,
								width: 16,
								background: `url(${tileSetUrl}) ${selected.tile4.xOffset}px ${selected.tile4.yOffset}px`,
							}}
						/>
					</div>
				)}
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
