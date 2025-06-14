import React from "react";
import { MapId } from "../../../constants/maps/mapsRecord";
import { Vector2 } from "../../../model/Vector2";

const unmemoedClickerGrid = ({
  width,
  height,
  onClick,
  baseSize,
  mapId,
  debugPath,
}: {
  width: number;
  height: number;
  onClick: (update: { y: number; x: number; mapId: MapId }) => void;
  baseSize: number;
  mapId: MapId;
  debugPath: Vector2[]
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: Array.from({ length: width })
          .map(() => "1fr")
          .join(" "),
      }}
    >
      {Array.from({ length: height }).map((_, h) => {
        return Array.from({ length: width }).map((_, w) => (
          <div
            key={h + "+" + w}
            onClick={() => onClick({ y: h, x: w, mapId })}
            style={{
              width: baseSize,
              height: baseSize,
            }}
          >
            {debugPath.some(vector => vector.x === w && vector.y === h) && (<div style={{ backgroundColor: "#00FF00", width: "25%", height: "25%", borderRadius: '16px', margin: '8px' }}></div>)}
          </div>
        ));
      })}
    </div>
  );
};

export const ClickerGrid = React.memo(unmemoedClickerGrid);
