import { useMemo } from "react";
import { Nature, natures } from "../../interfaces/Natures";

export const NatureSection = ({ nature }: { nature: Nature }) => {
  const mods = natures[nature];

  const modInfo = useMemo(() => {
    if (!mods.buff) {
      return "Neutral";
    }
    return `+10% ${mods.buff} & -10% ${mods.debuff} `;
  }, [mods.buff, mods.debuff]);

  return (
    <>
      <h3 style={{ marginBottom: 0 }}>{nature} Nature:</h3>
      <h4>{modInfo}</h4>
    </>
  );
};
