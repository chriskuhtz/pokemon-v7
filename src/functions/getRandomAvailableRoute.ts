import { MapId } from '../constants/maps/mapsRecord';
import { SaveFile } from '../interfaces/SaveFile';
import { getRandomEntry } from './filterTargets';

export const getRandomAvailableRoute = (
	s: SaveFile,
	omit: MapId[]
): MapId | undefined => {
	const options: MapId[] = ['routeN1'];

	if (s.campUpgrades['machete certification']) {
		options.push('routeN1E1');
	}
	if (s.campUpgrades['sledge hammer certification']) {
		options.push('routeE1');
	}
	if (s.campUpgrades['shovel certification']) {
		options.push('onixCave');
	}
	if (s.campUpgrades['swimming certification']) {
		options.push('routeS1E1', 'routeS1W1', 'caveW1', 'routeS1');
	}
	if (s.campUpgrades['buy skiing equipment']) {
		options.push('routeN1W1');
	}
	const filteredOptions = options.filter((o) => !omit.includes(o));

	if (filteredOptions.length === 0) {
		return;
	}
	return getRandomEntry(filteredOptions);
};
