import { useContext, useMemo } from 'react';
import { CgZoomIn, CgZoomOut } from 'react-icons/cg';
import { IoMdMenu } from 'react-icons/io';
import { TeamOverview } from '../../../components/TeamOverview/TeamOverview';
import { TimeOfDayIcon } from '../../../components/TimeOfDayIcon/TimeOfDayIcon';
import { WeatherIcon } from '../../../components/WeatherIcon/WeatherIcon';
import { battleSpriteSize } from '../../../constants/gameData';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
import { BaseSizeContext } from '../../../hooks/useBaseSize';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { UncollectedQuestsBadge } from './UncollectedQuestsBadge';

export const OverworldMenus = ({ stepsTaken }: { stepsTaken: number }) => {
	const { baseSize, setBaseSize } = useContext(BaseSizeContext);
	const { saveFile, navigateAwayFromOverworldReducer } =
		useContext(SaveFileContext);
	const map = useMemo(
		() => mapsRecord[saveFile.location.mapId],
		[saveFile.location.mapId]
	);
	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: '5rem',
					left: '1rem',
					zIndex: 8999,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<TeamOverview steps={stepsTaken} />
			</div>
			<div
				style={{
					position: 'absolute',
					top: '1.5rem',
					left: '1rem',
					zIndex: 8999,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
					display: 'flex',
					gap: '1rem',
				}}
			>
				<IoMdMenu
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						navigateAwayFromOverworldReducer('MAIN', stepsTaken);
					}}
					size={battleSpriteSize}
				/>
				<UncollectedQuestsBadge stepsWalked={stepsTaken} />

				<CgZoomOut
					size={battleSpriteSize}
					onClick={() => {
						if (baseSize === 16) {
							return;
						}
						setBaseSize(baseSize / 2);
					}}
				/>
				<CgZoomIn
					size={battleSpriteSize}
					onClick={() => {
						if (baseSize === 256) {
							return;
						}
						setBaseSize(baseSize * 2);
					}}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					top: '1.5rem',
					right: '1rem',
					display: 'flex',
					gap: '1rem',
					alignItems: 'center',
					zIndex: 9000,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
				}}
			>
				<strong>{map.id}</strong>
				<WeatherIcon weather={map.weather} />
				<TimeOfDayIcon />
			</div>
		</>
	);
};
