import { useCallback, useState } from 'react';
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
export interface GroupPlacer {
	type: 'groupPlacer';
	tiles: TileIdentifier[][];
}
export type Tool = TilePlacer | Eraser | GroupPlacer;

export const MapMaker = ({
	goBack,
	mapId,
}: {
	goBack: () => void;
	mapId: MapId;
}) => {
	const [twoByTwo, setTwoByTwo] = useState<GroupPlacer | undefined>();
	const [selected, s] = useState<Tool | undefined>();

	const setSelected = useCallback(
		(x: Tool) => {
			if (
				twoByTwo &&
				selected?.type !== 'groupPlacer' &&
				x.type === 'groupPlacer'
			) {
				s(twoByTwo);
				return;
			}
			if (x.type === 'groupPlacer') {
				setTwoByTwo(x);
			}
			s(x);
		},
		[selected?.type, twoByTwo]
	);

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
				Leave Mapmaker
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

export const TileGroupDisplay = ({
	selected,
	tileSetUrl,
}: {
	selected: GroupPlacer;
	tileSetUrl: string;
}) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: Array.from({ length: selected.tiles[0].length })
					.map(() => '1fr')
					.join(' '),
				width: 'min-content',
			}}
		>
			{selected.tiles.flat(1).map((t, i) => (
				<div
					key={t.xOffset + t.yOffset + i}
					style={{
						scale: 2,
						height: 16,
						width: 16,
						background: `url(${tileSetUrl}) ${t.xOffset}px ${t.yOffset}px`,
					}}
				/>
			))}
		</div>
	);
};
