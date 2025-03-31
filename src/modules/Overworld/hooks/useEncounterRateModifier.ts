import { useContext, useMemo } from 'react';
import { mapsRecord } from '../../../constants/maps/mapsRecord';
import { SaveFileContext } from '../../../hooks/useSaveFile';

export const useEncounterRateModifier = () => {
	const { saveFile } = useContext(SaveFileContext);

	const team = useMemo(
		() => saveFile.pokemon.filter((p) => p.onTeam),
		[saveFile.pokemon]
	);

	const firstTeamMember = useMemo(
		() => (team.length > 0 ? team[0] : undefined),
		[team]
	);

	const res = () => {
		const stenchFactor = firstTeamMember?.ability === 'stench' ? 0.5 : 1;
		const illumFactor = firstTeamMember?.ability === 'illuminate' ? 2 : 1;
		const swarmFactor = firstTeamMember?.ability === 'swarm' ? 2 : 1;
		const quickfeetFactor = firstTeamMember?.ability === 'quick-feet' ? 0.5 : 1;
		const itemFactor = saveFile.encounterRateModifier?.factor ?? 1;
		const snowCloakFactor =
			firstTeamMember?.ability === 'snow-cloak' &&
			mapsRecord[saveFile.location.mapId].weather === 'hail'
				? 0.5
				: 1;
		const sandstormFactor =
			firstTeamMember?.ability === 'sand-veil' &&
			mapsRecord[saveFile.location.mapId].weather === 'sandstorm'
				? 0.5
				: 1;

		return {
			upToXp:
				team.map((t) => t.xp).reduce((sum, summand) => sum + summand) /
				team.length,
			factor:
				1 *
				stenchFactor *
				itemFactor *
				sandstormFactor *
				snowCloakFactor *
				illumFactor *
				swarmFactor *
				quickfeetFactor,
		};
	};
	return res();
};
