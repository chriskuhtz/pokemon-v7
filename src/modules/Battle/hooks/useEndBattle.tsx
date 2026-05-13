import { useContext, useEffect } from "react";
import { applyEVGain } from "../../../functions/applyEVGain";
import { applyHappinessChange } from "../../../functions/applyHappinessChange";
import { calculateLevelData } from "../../../functions/calculateLevelData";
import { getHeldItem } from "../../../functions/getHeldItem";
import { getOpponentPokemon } from "../../../functions/getOpponentPokemon";
import { isKO } from "../../../functions/isKo";
import { LocationContext } from "../../../hooks/LocationProvider";
import { GameDataContext } from "../../../hooks/useGameData";
import { Message, MessageQueueContext } from "../../../hooks/useMessageQueue";
import { SaveFileContext } from "../../../hooks/useSaveFile";
import { BattlePokemon } from "../../../interfaces/BattlePokemon";
import { Stat } from "../../../interfaces/StatObject";

export const useEndBattle = (
  battleWon: boolean,
  battleLost: boolean,
  leaveWithCurrentData: (
    outcome: "WIN" | "LOSS" | "DRAW",
    defeatedPokemon?: BattlePokemon[],
    leveledUpTeam?: BattlePokemon[],
  ) => void,
  pokemon: BattlePokemon[],
  team: BattlePokemon[],
  isTrainerBattle: boolean,
) => {
  const { saveFile } = useContext(SaveFileContext);
  const { settings } = saveFile;
  const { location } = useContext(LocationContext);
  const gameData = useContext(GameDataContext);
  const { losingMessages } = gameData;
  const { latestMessage, addMessage, addMultipleMessages } =
    useContext(MessageQueueContext);
  useEffect(() => {
    if (battleLost && !latestMessage) {
      const { rogueLike } = settings ?? {};
      console.log("effect battlelost");

      const message = () => {
        if (
          location.mapId === "camp" ||
          location.mapId === "challengeField" ||
          location.mapId === "randomField"
        ) {
          return losingMessages.training;
        }
        if (rogueLike) {
          return losingMessages.reset;
        }

        if (saveFile.trait === "explorer") {
          return losingMessages.explorer;
        }

        return losingMessages.wild;
      };
      addMessage({
        message: message(),
        onRemoval: () => leaveWithCurrentData("LOSS"),
      });
    }
    if (battleWon && !latestMessage) {
      console.log("effect battlewon");

      const defeatedPokemon = getOpponentPokemon(pokemon).filter(
        (p) => p.status === "FAINTED",
      );
      //   //REWARDS
      //   const { rewardedTeam, messages } = applyRewardsToTeam(
      //     team,
      //     defeatedPokemon,
      //     saveFile.trait === "competitor",
      //     isTrainerBattle,
      //     !!settings?.expShareActive,
      //     !!settings?.doubleXpRates,
      //   );

      addMultipleMessages(
        [
          // ...messages,
          {
            message: "You won the battle",
            onRemoval: () => leaveWithCurrentData("WIN", defeatedPokemon, team),
          },
        ].filter((m) => m !== undefined),
      );
    }
  }, [
    addMessage,
    addMultipleMessages,
    battleLost,
    battleWon,
    isTrainerBattle,
    latestMessage,
    leaveWithCurrentData,
    location.mapId,
    losingMessages.explorer,
    losingMessages.reset,
    losingMessages.training,
    losingMessages.wild,
    pokemon,
    saveFile.trait,
    settings,
    team,
  ]);
};

export const applyRewardsToTeam = (
  team: BattlePokemon[],
  defeatedPokemon: BattlePokemon[],
  competitor: boolean,
  isTrainerBattle: boolean,
  expShareActive: boolean,
  doubleXpRates: boolean,
): { rewardedTeam: BattlePokemon[]; messages: Message[] } => {
  const gainedXp = defeatedPokemon.reduce((sum, d) => {
    const { level } = calculateLevelData(d.xp, d.growthRate);
    return sum + Math.floor((d.data.base_experience * level) / 7);
  }, 0);

  const xpPerTeamMember = () => {
    const numberOfParticipants = expShareActive
      ? team.filter((t) => !isKO(t)).length
      : team.filter((t) => t.participatedInBattle && !isKO(t)).length;

    let baseAmount = Math.round(gainedXp / numberOfParticipants);

    if (competitor) {
      return (baseAmount *= 1.2);
    }
    if (isTrainerBattle) {
      baseAmount *= 1.5;
    }
    if (doubleXpRates) {
      baseAmount *= 2;
    }
    return baseAmount;
  };

  const getsRewards = (p: BattlePokemon) =>
    (expShareActive || p.participatedInBattle) && !isKO(p);
  //XP REWARD
  const leveledUpTeam = team.map((p) => {
    if (getsRewards(p)) {
      const luckyEggfactor = getHeldItem(p, false) === "lucky-egg" ? 1.5 : 1;
      const gained = xpPerTeamMember() * luckyEggfactor;
      const newXp = p.xp + gained;
      return { ...p, xp: newXp };
    }
    return p;
  });
  const levelUpMessages: Message[] = leveledUpTeam
    .flatMap((pokemon) => {
      const prev = team.find((t) => t.id === pokemon.id);
      if (!prev) {
        return;
      }
      const prevLevel = calculateLevelData(prev.xp, prev.growthRate).level;
      const level = calculateLevelData(pokemon.xp, pokemon.growthRate).level;

      const res = [
        { message: `${pokemon.name} gained ${xpPerTeamMember()} XP` },
      ];

      if (prevLevel !== level) {
        res.push({ message: `${pokemon.name} reached level ${level}` });
      }
      return res;
    })
    .filter((m) => m !== undefined);
  //FRIENDSHIP REWARD, only for participants
  const friendshipIncreasedTeam = leveledUpTeam.map((p) => {
    if (p.participatedInBattle) {
      return applyHappinessChange(p, 1);
    }
    return p;
  });
  //EV REWARD, only for participants
  const evGainedTeam = friendshipIncreasedTeam.map((p) => {
    {
      if (p.participatedInBattle) {
        const updated = { ...p };
        defeatedPokemon.forEach((defeated) => {
          Object.entries(defeated.evAwards).forEach(([stat, award]) => {
            updated.effortValues = applyEVGain(
              updated.effortValues,
              stat as Stat,
              award,
              getHeldItem(p, false),
            );
          });
        });
        return updated;
      }
      return p;
    }
  });

  return { rewardedTeam: evGainedTeam, messages: levelUpMessages };
};
