import { useContext, useMemo } from 'react';
import { baseInternalDex } from '../../constants/baseInternalDex';
import { fps } from '../../constants/gameData/gameData';
import { getNextLocation } from '../../functions/getNextLocation';
import { getOppositeDirection } from '../../functions/getOppositeDirection';
import { isPassable } from '../../functions/isPassable';
import { LocationContext } from '../../hooks/LocationProvider';
import { BaseSizeContext } from '../../hooks/useBaseSize';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { useDrawFollowerPokemon } from '../../modules/Overworld/hooks/useDrawCharacter';
import { Occupant } from '../../interfaces/Occupant';
import { OverworldMap } from '../../interfaces/OverworldMap';

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
		const mon = saveFile.pokemon.find((p) => p.onTeam && p.damage < p.maxHp);

		if (!mon) {
			return -1;
		}

		return baseInternalDex[mon.name].dexId;
	}, [saveFile]);

	const showFollower = useMemo(() => {
		if (firstTeamMemberDexId > 741 || firstTeamMemberDexId < 0) {
			return false;
		}
		if (saveFile.flying) {
			return false;
		}
		return isPassable({
			nextLocation: getNextLocation(
				location,
				getOppositeDirection(location.orientation)
			),
			playerLocation: location,
			map,
			currentOccupants: occupants,
			canClimb: false,
			canSwim: false,
			flying: false,
		});
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
