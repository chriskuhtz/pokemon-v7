import { useContext, useMemo } from 'react';
import { v4 } from 'uuid';
import { OPPO_ID } from '../../functions/makeChallengerPokemon';
import { LocationContext } from '../../hooks/LocationProvider';
import { SaveFileContext } from '../../hooks/useSaveFile';
import { ImportedChallenger } from '../../interfaces/SaveFile';
import { Card } from '../../uiComponents/Card/Card';
import { SpriteIcon } from '../SpriteIcon/SpriteIcon';

export const ExportSnapshotCard = () => {
	const { location } = useContext(LocationContext);
	const { saveFile } = useContext(SaveFileContext);

	const file: ImportedChallenger = useMemo(() => {
		return {
			mapId: location.mapId,
			id: `${saveFile.playerId}`,
			x: location.x,
			y: location.y,
			conditionFunction: () => true,
			team: saveFile.pokemon
				.filter((p) => p.onTeam)
				.map((p) => ({ ...p, id: v4(), ownerId: OPPO_ID })),
			type: 'TRAINER',
			orientation: location.orientation,
			sprite: saveFile.sprite.slice(-3),
			unhandledMessage: [`Greetings from ${saveFile.playerId}`],
			battleTeamConfig: {
				assignLearnsetMoves: false,
				assignNaturalAbility: false,
				assignGender: false,
				assignHeldItem: false,
			},
		};
	}, [
		location.mapId,
		location.orientation,
		location.x,
		location.y,
		saveFile.playerId,
		saveFile.pokemon,
		saveFile.sprite,
	]);

	const now = new Date().getTime();
	const dataStr =
		'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(file));

	return (
		<Card
			icon={<SpriteIcon sprite={saveFile.sprite.slice(-3)} />}
			content={
				<h3>
					DownLoad a Snapshot of your current Team and Location to share with
					others
				</h3>
			}
			actionElements={[
				<button>
					<a download={`${saveFile.playerId}+${now}.json`} href={dataStr}>
						Download Snapshot
					</a>
				</button>,
			]}
		/>
	);
};
