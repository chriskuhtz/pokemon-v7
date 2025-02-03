import { useFetch } from '@potfisch-industries-npm/usefetch';
import { MoveDto } from '../interfaces/Move';

export const useGetMoveData = (moveName: string) => {
	return useFetch<MoveDto>(async () =>
		(await fetch(`https://pokeapi.co/api/v2/move/${moveName}`)).json()
	);
};
