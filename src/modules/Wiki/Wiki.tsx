import { useFetch } from "@potfisch-industries-npm/usefetch";
import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { abilityNames } from "../../constants/abilityCheckList";
import { battleSpriteSize } from "../../constants/baseConstants";
import { customItemDescriptions } from "../../constants/customItemDescriptions";
import { handledMoves } from "../../constants/movesCheckList";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { AbilityDto } from "../../interfaces/AbilityDto";
import { itemTypes } from "../../interfaces/Item";
import { ItemData } from "../../interfaces/ItemData";
import { MoveDto } from "../../interfaces/Move";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";
export const Wiki = () => {
  const { setActiveTabReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const [targetUrl, setTargetUrl] = useState<string | undefined>();
  const [searchString, setSearchString] = useState<string>("");

  const { res, invalidate, status } = useFetch<MoveDto | ItemData | AbilityDto>(
    async () => {
      if (targetUrl) {
        if (customItemDescriptions[targetUrl.split("/").at(-1) ?? ""]) {
          return {
            effect_entries: [
              {
                language: { name: "en" },
                short_effect:
                  customItemDescriptions[targetUrl.split("/").at(-1) ?? ""],
              },
            ],
          };
        }
        return (await fetch(targetUrl)).json();
      }
    },
  );

  useEffect(() => {
    console.log(res);
    const text =
      res?.["effect_entries"].find((entry) => entry.language.name === "en")
        ?.short_effect ?? "No Description available";
    if (targetUrl && text && status === "success") {
      addMessage({ message: text });
    }
  }, [addMessage, res, status, targetUrl]);

  return (
    <Page goBack={() => setActiveTabReducer("MAIN")} headline="Wiki:">
      <Stack mode="column">
        <Card
          icon={<FaSearch size={battleSpriteSize} />}
          content={
            <input
              value={searchString}
              onChange={(e) => setSearchString(e.target.value.toLowerCase())}
            />
          }
          actionElements={[]}
        />
        {handledMoves
          .filter((m) => m.includes(searchString))
          .map((m) => (
            <Card
              key={m}
              actionElements={[]}
              icon={<strong>Move</strong>}
              content={<strong>{m}</strong>}
              onClick={() => {
                invalidate();
                setTargetUrl(`https://pokeapi.co/api/v2/move/${m}`);
              }}
            />
          ))}
        {[...new Set(itemTypes)]
          .filter((m) => m.includes(searchString))
          .map((i) => (
            <Card
              key={i}
              actionElements={[]}
              icon={<strong>Item</strong>}
              content={<strong>{i}</strong>}
              onClick={() => {
                invalidate();
                setTargetUrl(`https://pokeapi.co/api/v2/item/${i}`);
              }}
            />
          ))}
        {abilityNames
          .filter((m) => m.includes(searchString))
          .map((a) => (
            <Card
              key={a}
              actionElements={[]}
              icon={<strong>Ability</strong>}
              content={<strong>{a}</strong>}
              onClick={() => {
                invalidate();
                setTargetUrl(`https://pokeapi.co/api/v2/ability/${a}`);
              }}
            />
          ))}
      </Stack>
    </Page>
  );
};
