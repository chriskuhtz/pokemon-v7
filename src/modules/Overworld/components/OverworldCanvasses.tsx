import { useContext, useMemo } from 'react';
import { CombinedCanvas } from '../../../components/CombinedCanvas/CombinedCanvas';
import { FollowerSprite } from '../../../components/FollowerSprite/FollowerSprite';
import { fps } from '../../../constants/gameData/gameData';
import { mapsRecord } from '../../../constants/gameData/maps/mapsRecord';
import { LocationContext } from '../../../hooks/LocationProvider';
import { BaseSizeContext } from '../../../hooks/useBaseSize';
import { useShader } from '../../../hooks/useShader';
import { Occupant } from '../../../interfaces/Occupant';
import { OverworldMap } from '../../../interfaces/OverworldMap';
import { CharacterOrientation } from '../../../interfaces/SaveFile';
import {
	backgroundCanvasId,
	occupantsCanvasId,
	playerCanvasId,
} from '../constants/constants';
import { useClickTarget } from '../hooks/useClickTarget';
import { useIsDark } from '../hooks/useIsDark';
import '../Overworld.css';
import { ClickerGrid } from './ClickerGrid';

export const OverworldCanvasses = ({
	setNextInput,
	interactWith,
	occupants,
}: {
	setNextInput: (x: CharacterOrientation | undefined) => void;
	interactWith: (occ: Occupant | undefined) => void;
	occupants: Occupant[];
}) => {
	const { baseSize } = useContext(BaseSizeContext);
	const { location } = useContext(LocationContext);
	const map = useMemo(
		(): OverworldMap => mapsRecord[location.mapId],
		[location.mapId]
	);
	const shader = useShader();
	const { width, height } = {
		width: map.tileMap.baseLayer[0].length,
		height: map.tileMap.baseLayer.length,
	};

	const setClickTarget = useClickTarget(
		map,
		setNextInput,
		interactWith,
		occupants
	);
	const { isDark, hasFlashlight, flashLightDirection } = useIsDark(map.id);

	return (
		<div className="overworldPage">
			{isDark ? (
				<div
					style={{
						background: `radial-gradient(
${flashLightDirection ?? 'circle'},
rgba(249, 246, 79, 0.1) 0%,
rgba(0, 0, 0, 1) ${hasFlashlight ? 48 : 16}%
)`,
						width: '100dvw',
						height: '100dvh',
						zIndex: 3,
						position: 'absolute',
						pointerEvents: 'none',
					}}
				></div>
			) : (
				<></>
			)}
			<div id="canvassesAndShaders" style={{ position: 'relative' }}>
				<div
					id="clickerGridWrapper"
					style={{
						width: width * baseSize,
						height: height * baseSize,
						top: -location.y * baseSize,
						left: -location.x * baseSize,
						position: 'absolute',
						zIndex: 3,
					}}
				>
					<ClickerGrid
						width={width}
						height={height}
						onClick={setClickTarget}
						baseSize={baseSize}
						mapId={location.mapId}
					/>
				</div>
				{map.foggy ? (
					<div
						className="fogshader"
						style={{
							marginLeft: '-100dvw',
							width: '300dvw',
							height: height * baseSize,
							top: -location.y * baseSize,
							left: -location.x * baseSize,
							position: 'absolute',
							zIndex: 2,
						}}
					/>
				) : (
					<></>
				)}

				<div
					id="shader1"
					style={{
						width: width * baseSize,
						height: height * baseSize,
						top: -location.y * baseSize,
						left: -location.x * baseSize,
						position: 'absolute',
						backgroundColor: shader,
						zIndex: 1,
					}}
				/>
				<canvas
					style={{
						top: -location.y * baseSize,
						left: -location.x * baseSize,
						transitionProperty: 'top,left',
						transition: `${fps} ease 0s`,
						zIndex: 0,
						position: 'absolute',
					}}
					id={'foreground'}
					height={height * baseSize}
					width={width * baseSize}
				/>
				<canvas
					id={playerCanvasId}
					height={baseSize * 1.5}
					style={{ marginTop: -baseSize * 0.5 }}
					width={baseSize}
				/>
				<FollowerSprite map={map} occupants={occupants} />

				<canvas
					style={{
						top: -location.y * baseSize,
						left: -location.x * baseSize,
						transitionProperty: 'top,left',
						transition: `${fps} ease 0s`,
						zIndex: -1,
						position: 'absolute',
					}}
					id={occupantsCanvasId}
					height={height * baseSize}
					width={width * baseSize}
				/>

				<div
					style={{
						top: -location.y * baseSize,
						left: -location.x * baseSize,
						zIndex: -3,
						position: 'absolute',
					}}
					id={backgroundCanvasId}
				>
					<CombinedCanvas
						map={map.tileMap}
						tileSize={baseSize}
						tileSetUrl={map.tilesetUrl}
					/>
				</div>
			</div>
			<div
				id="background"
				style={{
					width: '100dvw',
					height: '100dvh',
					top: 0,
					left: 0,
					position: 'absolute',
					backgroundColor: shader,
					zIndex: -4,
				}}
			/>
		</div>
	);
};
