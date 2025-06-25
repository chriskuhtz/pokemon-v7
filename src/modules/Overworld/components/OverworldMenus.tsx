import { useContext, useEffect, useMemo } from 'react';
import { CgZoomIn, CgZoomOut } from 'react-icons/cg';
import { IoMdMenu } from 'react-icons/io';
import { LureIcon } from '../../../components/LureIcon/LureIcon';
import { RepelIcon } from '../../../components/RepelIcon/RepelIcon';
import { StreakIcon } from '../../../components/StreakIcon/StreakIcon';
import { TeamOverview } from '../../../components/TeamOverview/TeamOverview';
import { TimeOfDayIcon } from '../../../components/TimeOfDayIcon/TimeOfDayIcon';
import {
	RampagerIcon,
	TroubleMakersIcon,
} from '../../../components/TroubleMakersIcon/TroubleMakersIcon';
import { WeatherIcon } from '../../../components/WeatherIcon/WeatherIcon';
import { battleSpriteSize, portraitMode } from '../../../constants/gameData';
import {
	mapDisplayNames,
	mapsRecord,
} from '../../../constants/maps/mapsRecord';
import { LocationContext } from '../../../hooks/LocationProvider';
import { BaseSizeContext } from '../../../hooks/useBaseSize';
import { SaveFileContext } from '../../../hooks/useSaveFile';
import { CharacterOrientation } from '../../../interfaces/SaveFile';
import { useIsDark } from '../hooks/useIsDark';
import { MovementButtons } from './MovementButtons';
import { NumberOfBallsBadge } from './NumberOfBallsBadge';
import { UncollectedQuestsBadge } from './UncollectedQuestsBadge';

export const OverworldMenus = ({
	stepsTaken,
	setNextInput,
	handleEnterPress,
}: {
	stepsTaken: number;
	setNextInput: React.Dispatch<
		React.SetStateAction<CharacterOrientation | undefined>
	>;
	handleEnterPress: () => void;
}) => {
	const { baseSize, setBaseSize } = useContext(BaseSizeContext);
	const { navigateAwayFromOverworldReducer } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const map = useMemo(() => mapsRecord[location.mapId], [location.mapId]);

	const { isDark } = useIsDark(map.id);
	useEffect(() => {
		if (isDark && baseSize !== 64) {
			setBaseSize(64);
		}
	}, [baseSize, isDark, setBaseSize]);
	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: portraitMode ? '1.5rem' : '5rem',

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
					top: portraitMode ? '5rem' : '1.5rem',
					left: portraitMode ? undefined : '1rem',
					right: portraitMode ? '1rem' : undefined,
					zIndex: 8999,
					padding: '.5rem',
					borderRadius: 9000,
					backgroundColor: 'rgba(255,255,255,.6)',
					display: 'flex',
					gap: '1rem',
					flexDirection: portraitMode ? 'column' : 'row',
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
				<NumberOfBallsBadge />

				<CgZoomOut
					size={battleSpriteSize}
					onClick={() => {
						if (baseSize === 16 || isDark) {
							return;
						}
						setBaseSize(baseSize / 2);
					}}
				/>
				<CgZoomIn
					size={battleSpriteSize}
					onClick={() => {
						if (baseSize === 256 || isDark) {
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
				<StreakIcon />
				<TroubleMakersIcon />
				<RampagerIcon />
				<RepelIcon />
				<LureIcon />
				<strong>{mapDisplayNames[map.id]}</strong>
				<WeatherIcon weather={map.weather} />
				<TimeOfDayIcon />
			</div>
			<MovementButtons
				setNextInput={setNextInput}
				handleEnterPress={handleEnterPress}
			/>
		</>
	);
};
