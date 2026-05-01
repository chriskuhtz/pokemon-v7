import { Occupant } from "../interfaces/Occupant";

export const getNextFieldOccupant = (
  focusedField: { x: number; y: number },
  statefulOccupantsRecord: Occupant[],
): Occupant | undefined => {
  return (
    //always pick berry tree first, berry tree and empty berry tree exist ontop of each other
    statefulOccupantsRecord.find(
      (occ) =>
        occ.x === focusedField.x &&
        occ.y === focusedField.y &&
        occ.type === "BERRY_TREE",
    ) ??
    statefulOccupantsRecord.find(
      (occ) => occ.x === focusedField.x && occ.y === focusedField.y,
    )
  );
};
