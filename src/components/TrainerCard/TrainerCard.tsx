import { useContext } from "react";
import { battleSpriteSize } from "../../constants/baseConstants";
import { GameDataContext } from "../../hooks/useGameData";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { traitBonusExplanations } from "../../interfaces/Trait";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";
import { CatchBoosts } from "../CatchBoosts/CatchBoosts";

export const TrainerCard = () => {
  const {
    saveFile: {
      sprite,
      playerId,
      researchPoints,
      mileStones,
      rangerLevel,
      longestStreak,
      trait,
      badges,
    },
  } = useContext(SaveFileContext);
  const gameData = useContext(GameDataContext);

  return (
    <Card
      icon={
        <img
          src={`/npcs/${sprite}.png`}
          style={{
            objectFit: "none",
            objectPosition: "0 0",
            width: battleSpriteSize * 2,
            height: battleSpriteSize * 2,
          }}
        />
      }
      content={
        <>
          <Stack mode="column">
            <h4>
              {trait} {playerId}
            </h4>

            {trait &&
              traitBonusExplanations[trait].map((t) => (
                <div key={t}>
                  <strong>{t}</strong>
                </div>
              ))}
            {gameData.features.quests && (
              <h4>Research Points: {researchPoints}</h4>
            )}
            <h4>Damage Record: {mileStones.damageRecord}</h4>

            {mileStones.challengeFieldRecord ? (
              <h4>Challenge Field Record: {mileStones.challengeFieldRecord}</h4>
            ) : (
              <></>
            )}
            {mileStones.randomFieldRecord ? (
              <h4>Random Field Record: {mileStones.randomFieldRecord}</h4>
            ) : (
              <></>
            )}
            {longestStreak && gameData.features.catchStreaks ? (
              <h4>Longest Catch Streak: {longestStreak}</h4>
            ) : (
              <></>
            )}
            {rangerLevel ? <h4>Ranger Level: {rangerLevel}</h4> : <></>}

            {badges.length > 0 && <h3>Badges:</h3>}
            <Stack mode="row">
              {badges.map((b) => (
                <img
                  key={b}
                  height={battleSpriteSize}
                  width={battleSpriteSize}
                  src={`/badges/${b}.png`}
                />
              ))}
            </Stack>
          </Stack>

          <CatchBoosts />
        </>
      }
      actionElements={[]}
    />
  );
};
