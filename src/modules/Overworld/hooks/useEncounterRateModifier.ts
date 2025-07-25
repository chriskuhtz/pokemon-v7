import { useContext, useMemo } from 'react';
import { mapsRecord } from '../../../constants/gameData/maps/mapsRecord';
import { getHeldItem } from '../../../functions/getHeldItem';
import { LocationContext } from '../../../hooks/LocationProvider';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useEncounterRateModifier = () => {
	const { saveFile } = useContext(SaveFileContext);
	const { location } = useContext(LocationContext);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile.pokemon]
	);

	const firstTeamMember = useMemo(
		() => (team.length > 0 ? team[0] : undefined),
		[team]
	);

	const res = useMemo(() => {
		const stenchFactor = firstTeamMember?.ability === 'stench' ? 0.5 : 1;
		const illumFactor = firstTeamMember?.ability === 'illuminate' ? 2 : 1;
		const swarmFactor = firstTeamMember?.ability === 'swarm' ? 2 : 1;
		const quickfeetFactor = firstTeamMember?.ability === 'quick-feet' ? 0.5 : 1;
		const snowCloakFactor =
			firstTeamMember?.ability === 'snow-cloak' &&
			mapsRecord[location.mapId].weather === 'hail'
				? 0.5
				: 1;
		const sandstormFactor =
			firstTeamMember?.ability === 'sand-veil' &&
			mapsRecord[location.mapId].weather === 'sandstorm'
				? 0.5
				: 1;
		const cleanseTagFactor =
			firstTeamMember && getHeldItem(firstTeamMember) === 'cleanse-tag' ? 0 : 1;

		return {
			factor:
				1 *
				stenchFactor *
				sandstormFactor *
				snowCloakFactor *
				illumFactor *
				swarmFactor *
				quickfeetFactor *
				cleanseTagFactor,
		};
	}, [firstTeamMember, location.mapId]);
	return res;
};
