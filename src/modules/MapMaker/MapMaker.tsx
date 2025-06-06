import { useCallback, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MapId, mapsRecord } from '../../constants/maps/mapsRecord';
import { TileIdentifier } from '../../interfaces/OverworldMap';
import { MapEditor } from './components/MapEditor';
import { LayerName } from './hooks/useMapEditor';

export const BaseSize = 16;
export interface TilePlacer {
	tile: TileIdentifier;
}
export interface Eraser {
	type: 'eraser';
}
export interface GroupPlacer {
	type: 'groupPlacer';
	tiles: TileIdentifier[][];
}
export type Tool = Eraser | GroupPlacer;

export const MapMaker = ({
	goBack,
	mapId,
}: {
	goBack: () => void;
	mapId: MapId;
}) => {
	const [groupPlacer, setGroupPlacer] = useState<GroupPlacer | undefined>();
	const [selected, s] = useState<Tool | undefined>();

	const setSelected = useCallback(
		(x: Tool) => {
			if (
				groupPlacer &&
				selected?.type !== 'groupPlacer' &&
				x.type === 'groupPlacer'
			) {
				s(groupPlacer);
				return;
			}
			if (x.type === 'groupPlacer') {
				setGroupPlacer(x);
			}
			s(x);
		},
		[selected?.type, groupPlacer]
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
