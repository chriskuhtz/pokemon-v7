import { TypeInfo } from '../interfaces/PokemonData';

export const getTypeNames = (typeInfos: TypeInfo[]): string[] => {
	return typeInfos.map((t) => t.type.name);
};
