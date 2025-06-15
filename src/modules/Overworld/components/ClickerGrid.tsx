import React from "react";
import { MapId } from "../../../constants/maps/mapsRecord";

const unmemoedClickerGrid = ({
  width,
  height,
  onClick,
  baseSize,
  mapId
}: {
  width: number;
  height: number;
  onClick: (update: { y: number; x: number; mapId: MapId }) => void;
  baseSize: number;
  mapId: MapId;
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
          </div>
        ));
      })}
    </div>
  );
};

export const ClickerGrid = React.memo(unmemoedClickerGrid);
