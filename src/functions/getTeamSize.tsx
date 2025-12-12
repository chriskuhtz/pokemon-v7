import { SaveFile } from '../interfaces/SaveFile';

export const getTeamSize = (s: SaveFile) => {
	if (s.settings?.fixedTeamSize) {
		return s.settings?.fixedTeamSize;
	}
	if (s.campUpgrades['team slot 6']) {
		return 6;
	}
	if (s.campUpgrades['team slot 5']) {
		return 5;
	}
	if (s.campUpgrades['team slot 4']) {
		return 4;
	}
	if (s.campUpgrades['team slot 3']) {
		return 3;
	}
	return 2;
};
