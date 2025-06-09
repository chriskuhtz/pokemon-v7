import React, {
	JSX,
	useCallback,
	useDeferredValue,
	useMemo,
	useState,
} from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MapId, mapsRecord } from '../../../constants/maps/mapsRecord';
import { TileIdentifier } from '../../../interfaces/OverworldMap';
import { LayerName, useMapEditor } from '../hooks/useMapEditor';
import { FillTools } from './FillTools';
import { FloatyMenu } from './FloatyMenu';
import { LayerEditor } from './LayerEditor';
import { LayerSelector } from './LayerSelector';
import { OpacitySelector } from './OpacitySelector';
import { QuickSelection } from './QuickSelection';
import { ToolSelection } from './ToolSelection';

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

export const MapEditor = ({
	goBack,
	mapId,
}: {
	goBack: () => void;
	mapId: MapId;
}): JSX.Element => {
	const initialMap = useMemo(() => mapsRecord[mapId], [mapId]);
	const [opacity, setOpacity] = useState<number>(0.5);

	const [groupPlacer, setGroupPlacer] = useState<GroupPlacer | undefined>();
	const [tool, s] = useState<Tool | undefined>();

	const setSelected = useCallback(
		(x: Tool) => {
			if (
				groupPlacer &&
				tool?.type !== 'groupPlacer' &&
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
		[tool?.type, groupPlacer]
	);

	const [activeTab, setActiveTab] = useState<LayerName>('Base');
	const {
		addColumn,
		addRow,
		changeTile,
		clearLayer,
		changeRow,
		changeColumn,
		baseLayer,
		encounterLayer,
		decorationLayer,
		foregroundLayer,
		obstacleLayer,
		waterLayer,
		randomFill,
		replaceAll,
	} = useMapEditor({
		tool,
		initialMap,
	});

	const layer = useMemo(() => {
		if (activeTab === 'Decoration') {
			return decorationLayer;
		}
		if (activeTab === 'Water') {
			return waterLayer;
		}
		if (activeTab === 'Encounter') {
			return encounterLayer;
		}
		if (activeTab === 'Obstacle') {
			return obstacleLayer;
		}
		if (activeTab === 'Foreground') {
			return foregroundLayer;
		}

		return baseLayer;
	}, [
		activeTab,
		baseLayer,
		decorationLayer,
		encounterLayer,
		foregroundLayer,
		obstacleLayer,
		waterLayer,
	]);

	const tileMap = useDeferredValue({
		baseLayer,
		encounterLayer,
		decorationLayer,
		foregroundLayer,
		obstacleLayer,
		waterLayer,
	});

	return (
		<React.Fragment>
			<FloatyMenu top={16} left={16}>
				<IoIosArrowBack role="button" tabIndex={0} onClick={goBack} />
			</FloatyMenu>
			<LayerSelector activeTab={activeTab} setActiveTab={setActiveTab} />
			<OpacitySelector setOpacity={setOpacity} opacity={opacity} />
			<ToolSelection
				selected={tool}
				setSelected={setSelected}
				tileSetUrl={initialMap.tilesetUrl}
			/>
			<FillTools
				activeTab={activeTab}
				randomFill={randomFill}
				clearLayer={clearLayer}
				replaceAll={replaceAll}
			/>
			<QuickSelection
				tileMap={tileMap}
				tileSetUrl={initialMap.tilesetUrl}
				setSelected={setSelected}
			/>

			<LayerEditor
				opacity={opacity}
				tileSetUrl={initialMap.tilesetUrl}
				tileMap={tileMap}
				occupants={initialMap.occupants}
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={layer}
				layerName={activeTab}
				changeRow={(index) => changeRow(index, activeTab)}
				changeColumn={(index) => changeColumn(index, activeTab)}
			/>
		</React.Fragment>
	);
};
