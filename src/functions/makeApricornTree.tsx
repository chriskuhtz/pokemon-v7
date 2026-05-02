import { ApricornType } from "../interfaces/Item";
import { ApricornTree, EmptyApricornTree } from "../interfaces/Occupant";
import { occupantHandled } from "./occupantHandled";
const apricornSpriteMap: Record<ApricornType, string> = {
  "black-apricorn": "/mapObjects/apricornBlack.png",
  "blue-apricorn": "/mapObjects/apricornBlue.png",
  "green-apricorn": "/mapObjects/apricornGreen.png",
  "pink-apricorn": "/mapObjects/apricornPink.png",
  "red-apricorn": "/mapObjects/apricornRed.png",
  "white-apricorn": "/mapObjects/apricornWhite.png",
  "yellow-apricorn": "/mapObjects/apricornYellow.png",
  "orange-apricorn": "/mapObjects/apricornYellow.png",
  "grey-apricorn": "/mapObjects/apricornGrey.png",
  "purple-apricorn": "/mapObjects/apricornPurple.png",
};
export const makeApricornTree = ({
  x,
  y,
  apricorn,
  id,
}: {
  x: number;
  y: number;
  apricorn: ApricornType;
  id: string;
}): [ApricornTree, EmptyApricornTree] => {
  return [
    {
      id,
      type: "APRICORN_TREE",
      x,
      y,
      apricorn,
      sprite: apricornSpriteMap[apricorn],
      conditionFunction: (s) => !occupantHandled(s, id),
    },
    {
      id: `${id}_empty`,
      type: "EMPTY_APRICORN_TREE",
      x,
      y,
      conditionFunction: (s) => occupantHandled(s, id),
    },
  ];
};
