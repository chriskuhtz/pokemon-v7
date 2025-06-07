import { useContext, useMemo } from 'react';
import { fps } from '../../constants/gameData';
import { internalDex } from '../../constants/internalDexData';
import { getNextLocation } from '../../functions/getNextLocation';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { isPassable } from '../../functions/isPassable';
import { LocationContext } from '../../hooks/LocationProvider';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { Occupant, OverworldMap } from '../../interfaces/OverworldMap';
import { useDrawFollowerPokemon } from '../../modules/Overworld/hooks/useDrawCharacter';

const followerCanvasId = 'followerCanvas';

export const FollowerSprite = ({
	map,
	occupants,
}: {
	map: OverworldMap;
	occupants: Occupant[];
}): JSX.Element => {
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);
	const { baseSize } = useContext(BaseSizeContext);
	const firstTeamMemberDexId = useMemo(() => {
		const mon = saveFile.pokemon.find((p) => p.onTeam);

		if (!mon) {
			return -1;
		}

		return internalDex[mon.name].dexId;
	}, [saveFile]);

	const showFollower = useMemo(() => {
		if (firstTeamMemberDexId > 741 || firstTeamMemberDexId < 0) {
			return false;
		}
		return isPassable(
			getNextLocation(location, getOppositeDirection(location.orientation)),
			map,
			occupants,
			false,
			saveFile.flying ?? false,
			false
		);
	}, [firstTeamMemberDexId, location, map, occupants, saveFile.flying]);

	useDrawFollowerPokemon(followerCanvasId, location, firstTeamMemberDexId);

	if (showFollower) {
		return (
			<canvas
				style={{
					top:
						location.orientation === 'DOWN'
							? -baseSize
							: location.orientation === 'UP'
							? baseSize
							: 0,
					left:
						location.orientation === 'LEFT'
							? baseSize
							: location.orientation === 'RIGHT'
							? -baseSize
							: 0,
					transitionProperty: 'top,left',
					transition: `${fps} ease 0s`,
					position: 'absolute',
					zIndex: -1,
				}}
				id={followerCanvasId}
				height={baseSize}
				width={baseSize}
			/>
		);
	}
	return <></>;
};
