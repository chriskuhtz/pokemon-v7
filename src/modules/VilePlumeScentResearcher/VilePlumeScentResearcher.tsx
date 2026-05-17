import { useCallback, useContext } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemInfoButton } from "../../components/ItemInfoButton/ItemInfoButton";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { ItemType } from "../../interfaces/Item";
import { Occupant } from "../../interfaces/Occupant";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Card } from "../../uiComponents/Card/Card";
import { Stack } from "../../uiComponents/Stack/Stack";

const vilePlumeProducts: Partial<
  Record<ItemType, { item: ItemType; amount: number }>
> = {
  repel: { item: "pecha-berry", amount: 3 },
  "super-repel": { item: "kebia-berry", amount: 4 },
  "max-repel": { item: "rindo-berry", amount: 5 },
  lure: { item: "chesto-berry", amount: 3 },
  "super-lure": { item: "coba-berry", amount: 4 },
  "max-lure": { item: "aguav-berry", amount: 50 },
  "rock-incense": { item: "charti-berry", amount: 5 },
  "wave-incense": { item: "passho-berry", amount: 5 },
  "rose-incense": { item: "rindo-berry", amount: 5 },
  "full-incense": { item: "sitrus-berry", amount: 5 },
  "lax-incense": { item: "oran-berry", amount: 5 },
  "odd-incense": { item: "payapa-berry", amount: 5 },
};

export const useVileplumeScentResearcher = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const trade = useCallback(
    (product: ItemType) => {
      const price = vilePlumeProducts[product];

      if (!price) {
        return;
      }
      addMessage({
        message: `Traded ${price.amount} ${price.item}  for  ${product}`,
      });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, {
          [product]: 1,
          [price.item]: -price.amount,
        }),
      });
    },
    [addMessage, patchSaveFileReducer, saveFile.bag],
  );

  return { trade };
};

export const VilePlumeScentResearcher = (): JSX.Element => {
  const { saveFile } = useContext(SaveFileContext);
  const { trade } = useVileplumeScentResearcher();

  const navigate = useNavigate();
  return (
    <InGamePage
      headline="Trade Berries for Repels"
      goBack={() => navigate("CURATOR", "OVERWORLD")}
    >
      <Stack mode={"column"}>
        {Object.entries(vilePlumeProducts).map(([product, price]) => (
          <Card
            key={product}
            disabled={saveFile.bag[price.item] < price.amount}
            onClick={() => trade(product as ItemType)}
            icon={<ItemSprite item={price.item} />}
            content={
              <div>
                <h3>
                  Trade {price.amount} {price.item} for {product}
                </h3>
              </div>
            }
            actionElements={[
              <ItemSprite item={product as ItemType} />,
              <ItemInfoButton itemName={product as ItemType} />,
            ]}
          />
        ))}
      </Stack>
    </InGamePage>
  );
};

export const vileplumeResearchers: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "Vileplume produces fascinating scents",
      "I was able to distill these scents",
      "into a spray that repels pokemon",
      "Vileplume loves berries",
      "would you like to trade?",
    ],
    to: "VILEPLUME",
    x: 1,
    y: 6,
    orientation: "RIGHT",
    sprite: SpriteEnum.scientistMale,
    id: "vileplume researcher",
    conditionFunction: (s) =>
      s.campUpgrades["invite vileplume scent researcher"],
  },
  {
    type: "POKEMON",
    dexId: 45,
    x: 1,
    y: 7,
    orientation: "RIGHT",
    id: "vileplume",
    dialogue: ["It really smells 'fascinating'"],
    conditionFunction: (s) =>
      s.campUpgrades["invite vileplume scent researcher"],
  },
];
