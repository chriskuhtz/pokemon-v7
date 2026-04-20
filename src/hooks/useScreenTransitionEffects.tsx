import React, { ReactNode, useEffect, useState } from "react";
import { ArrayHelpers } from "../functions/ArrayHelpers";

export type TransitionEffect = "random_squares" | "rows";
export interface ScreenTransition {
  onRemoval: () => void;
  effect: TransitionEffect;
}
export const ScreenTransitionContext = React.createContext(
  {} as {
    activateTransition: (x: ScreenTransition) => void;
    transition: ScreenTransition | undefined;
  },
);

const emptySquares = Array.from({ length: 36 }).map((_, i) =>
  i === 0 ? 1 : 0,
);
const emptyRows = Array.from({ length: 18 }).map((_, i) => (i === 0 ? 1 : 0));

export const ScreenTransitionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [transition, setTransition] = useState<ScreenTransition>();

  return (
    <ScreenTransitionContext.Provider
      value={{
        activateTransition: setTransition,
        transition,
      }}
    >
      {children}
      {transition && (
        <TransitionEffectComponent
          resetTransition={() => setTransition(undefined)}
          transition={transition}
        />
      )}
    </ScreenTransitionContext.Provider>
  );
};

const TransitionEffectComponent = ({
  transition,
  resetTransition,
}: {
  transition: ScreenTransition;
  resetTransition: () => void;
}) => {
  if (transition.effect === "rows") {
    return (
      <RowsComponent
        transition={transition}
        resetTransition={resetTransition}
      />
    );
  }
  return (
    <SquaresComponent
      transition={transition}
      resetTransition={resetTransition}
    />
  );
};

const SquaresComponent = ({
  transition,
  resetTransition,
}: {
  transition: ScreenTransition;
  resetTransition: () => void;
}) => {
  const [squares, setSquares] = useState<number[]>([...emptySquares]);
  useEffect(() => {
    if (!transition) {
      setSquares(emptySquares);
      return;
    }
    setTimeout(() => {
      const emptySquares = squares.filter((s) => s === 0);
      const indexesOfEmptySquares = squares
        .map((s, i) => {
          return s ? undefined : i;
        })
        .filter((entry) => entry !== undefined);

      const indexOfAnEmptySquare = ArrayHelpers.getRandomEntry(
        indexesOfEmptySquares,
      );
      if (transition && emptySquares.length > 0) {
        setSquares(
          squares.map((s, i) => {
            if (i === indexOfAnEmptySquare) {
              return 1;
            }
            return s;
          }),
        );
      } else if (transition) {
        transition.onRemoval();
        resetTransition();
      }
    }, 50);
  }, [resetTransition, squares, transition]);
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        zIndex: 9000,
        width: "100dvw",
        height: "100dvh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr",
        alignItems: "stretch",
        justifyItems: "stretch",
      }}
    >
      {squares.map((s, i) => (
        <div
          key={i}
          style={{ backgroundColor: s && transition ? "black" : undefined }}
        ></div>
      ))}
    </div>
  );
};
const RowsComponent = ({
  transition,
  resetTransition,
}: {
  transition: ScreenTransition;
  resetTransition: () => void;
}) => {
  const [rows, setRows] = useState<number[]>([...emptyRows]);
  useEffect(() => {
    if (!transition) {
      setRows(emptyRows);
      return;
    }
    setTimeout(() => {
      const indexOfNextEmptyRow = rows.findIndex((s) => s === 0);

      if (transition && indexOfNextEmptyRow > 0) {
        setRows(
          rows.map((r, i) => {
            if (i === indexOfNextEmptyRow) {
              return 1;
            }
            return r;
          }),
        );
      } else if (transition) {
        transition.onRemoval();
        resetTransition();
      }
    }, 25);
  }, [resetTransition, rows, transition]);
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        zIndex: 9000,
        width: "100dvw",
        height: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns:
          "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        alignItems: "stretch",
        justifyItems: "stretch",
      }}
    >
      {rows.map((s, i) => (
        <div
          key={i}
          style={{ backgroundColor: s && transition ? "black" : undefined }}
        ></div>
      ))}
    </div>
  );
};
