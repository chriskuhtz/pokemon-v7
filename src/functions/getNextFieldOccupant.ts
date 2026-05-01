import { Occupant } from "../interfaces/Occupant";

export const getNextFieldOccupant = (
  focusedField: { x: number; y: number },
  statefulOccupantsRecord: Occupant[],
): Occupant | undefined => {
  return statefulOccupantsRecord
    .filter((occ) => occ.x === focusedField.x && occ.y === focusedField.y)
    .sort((a) => {
      return a.type === "BERRY_TREE" ? 1 : -1;
    })
    .at(0);
};
