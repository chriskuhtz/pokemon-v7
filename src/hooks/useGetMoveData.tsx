import { useFetch } from '@potfisch-industries-npm/usefetch';
import { MoveDto } from '../interfaces/Move';
import { struggle } from '../constants/struggle';

export const useGetMoveData = (moveName?: string) => {
	return useFetch<MoveDto>(async () => {
		if (moveName === 'struggle') {
			return struggle;
		}
		return (await fetch(`https://pokeapi.co/api/v2/move/${moveName}`)).json();
	});
};
