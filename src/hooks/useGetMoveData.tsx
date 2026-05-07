import { useFetch } from "@potfisch-industries-npm/usefetch";
import { customMoves } from "../constants/customMoves";
import { MoveName } from "../constants/movesCheckList";
import { MoveDto } from "../interfaces/Move";

export const useGetMoveData = (moveName: MoveName) => {
  return useFetch<MoveDto>(async () => await getMoveData(moveName));
};
export const getMoveData = async (moveName: MoveName): Promise<MoveDto> => {
  const customMove = customMoves[moveName];
  if (customMove) {
    return customMove;
  }
  return (await fetch(`https://pokeapi.co/api/v2/move/${moveName}`)).json();
};
