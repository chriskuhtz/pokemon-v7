import { BerryType } from "../interfaces/Item";
import { BerryTree, EmptyBerryTree } from "../interfaces/Occupant";
import { occupantHandled } from "./occupantHandled";

export const makeBerryTree = ({
  x,
  y,
  berry,
  id,
}: {
  x: number;
  y: number;
  berry: BerryType;
  id: string;
}): [BerryTree, EmptyBerryTree] => {
  return [
    {
      id,
      type: "BERRY_TREE",
      x,
      y,
      berry,
      conditionFunction: (s) => !occupantHandled(s, id),
    },
    {
      id: `${id}_empty`,
      type: "EMPTY_BERRY_TREE",
      x,
      y,
      berry,
      conditionFunction: () => true,
    },
  ];
};
