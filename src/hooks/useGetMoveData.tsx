import { useFetch } from "@potfisch-industries-npm/usefetch";
import {
  customMetas,
  customMoves,
  customStatChanges,
  fallBackMeta,
} from "../constants/customMoves";
import { MoveName } from "../constants/movesCheckList";
import { MoveDto } from "../interfaces/Move";

export const useGetMoveData = (moveName: MoveName) => {
  return useFetch<MoveDto>(async () => {
    return getMoveData(moveName);
  });
};
export const getMoveData = async (moveName: MoveName): Promise<MoveDto> => {
  const customMove = customMoves[moveName];
  const customMeta = customMetas[moveName];
  const customStatChange = customStatChanges[moveName];
  if (customMove) {
    return customMove;
  }
  const res: Promise<MoveDto> = (
    await fetch(`https://pokeapi.co/api/v2/move/${moveName}`)
  ).json();

  const r = await res;

  return {
    ...r,
    meta: r.meta ?? customMeta ?? fallBackMeta,
    stat_changes: r.stat_changes ?? customStatChange,
  };
};
