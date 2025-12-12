import { SaveFile } from '../../interfaces/SaveFile';

export const canSwim = (s: SaveFile) =>
	s.campUpgrades['swimming certification'];
