import { CSSProperties, ReactNode } from "react";

export const Stack = ({
  children,
  gapInRem,
  mode,
  justifyContent,
  alignItems,
  overflow,
  flexWrap,
}: {
  children: ReactNode[];
  gapInRem?: number;
  mode: "row" | "column";
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  overflow?: CSSProperties["overflow"];
  flexWrap?: CSSProperties["flexWrap"];
}): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: mode,
        flexWrap: flexWrap ?? "wrap",
        gap: `${gapInRem ?? 0.5}rem`,
        maxWidth: "100%",
        justifyContent,
        alignItems,
        overflow,
      }}
    >
      {children}
    </div>
  );
};
