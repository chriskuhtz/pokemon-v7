import { useCallback, useContext, useMemo } from "react";
import { InGamePage } from "../../components/InGamePage/InGamePage";
import { ItemSelectionOption } from "../../components/ItemSelectionOption/ItemSelectionOption";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import { ItemType, berries, heldItems } from "../../interfaces/Item";
import { Occupant } from "../../interfaces/Occupant";
import { SpriteEnum } from "../../interfaces/SpriteEnum";
import { Stack } from "../../uiComponents/Stack/Stack";

export const useTravellingMerchant = () => {
  const { patchSaveFileReducer, saveFile } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const availableTrades: {
    give: ItemType;
    receive: ItemType;
    disabled: boolean;
    amount: number;
  }[] = useMemo(() => {
    const ber = [...berries, ...berries, ...berries];

    return heldItems.map((h, i) => ({
      receive: h,
      give: h === "lucky-egg" ? "enigma-berry" : ber[i],
      amount: saveFile.bag[ber[i]],
      disabled: saveFile.bag[ber[i]] < 5,
    }));
  }, [saveFile.bag]);

  const trade = useCallback(
    (give: ItemType, receive: ItemType) => {
      addMessage({ message: `Traded 5 ${give} for 1 ${receive}` });
      patchSaveFileReducer({
        bag: joinInventories(saveFile.bag, {
          [receive]: 1,
          [give]: -5,
        }),
      });
    },
    [addMessage, patchSaveFileReducer, saveFile.bag],
  );

  return { availableTrades, trade };
};

export const TravellingMerchant = (): JSX.Element => {
  const { trade, availableTrades } = useTravellingMerchant();

  const navigate = useNavigate();
  return (
    <InGamePage
      headline="Trade Berries for battle items"
      goBack={() => navigate("TRAVELLING_MERCHANT", "OVERWORLD")}
    >
      <Stack mode="column">
        {availableTrades.map(({ give, receive, disabled, amount }) => {
          return (
            <ItemSelectionOption
              disabled={disabled}
              additionalContent={
                <>
                  Trade for 5 {give}({amount} in Bag)
                </>
              }
              onClick={() => trade(give, receive)}
              item={receive}
              additionalIcons={[<ItemSprite item={give} />]}
              isSelected={false}
            />
          );
        })}
      </Stack>
    </InGamePage>
  );
};

const baseTravellingMerchant: Occupant[] = [
  {
    type: "ROUTER_NPC",
    dialogue: [
      "I stop in a different spot every day",
      "and search for the tastiest berries",
      "Do you want to trade some of this junk for berries?",
    ],
    to: "TRAVELLING_MERCHANT",
    x: 2,
    y: 1,
    orientation: "DOWN",
    sprite: SpriteEnum.hiker,
    id: "travelling-merchant",
    conditionFunction: () => true,
  },
  {
    type: "OBSTACLE",
    src: "./mapObjects/trailer.png",
    x: 1,
    y: 1,
    id: "trailer",
    conditionFunction: () => true,
  },
];

export const travellingMerchantRouteN1: Occupant[] = baseTravellingMerchant.map(
  (h, i) => ({
    ...h,
    x: 38 + i,
    y: 35,
    conditionFunction: () => true,
  }),
);

export const travellingMerchantRouteN1E1: Occupant[] =
  baseTravellingMerchant.map((h, i) => ({
    ...h,
    x: 10 + i,
    y: 2,
    conditionFunction: () => true,
  }));

export const travellingMerchantRouteE1: Occupant[] = baseTravellingMerchant.map(
  (h, i) => ({
    ...h,
    x: 32 + i,
    y: 5,
    conditionFunction: () => true,
  }),
);

export const travellingMerchantRouteS1E1: Occupant[] =
  baseTravellingMerchant.map((h, i) => ({
    ...h,
    x: 16 + i,
    y: 8,
    conditionFunction: () => true,
  }));

export const travellingMerchantRouteS1: Occupant[] = baseTravellingMerchant.map(
  (h, i) => ({
    ...h,
    x: 21 + i,
    y: 4,
    conditionFunction: () => true,
  }),
);

export const travellingMerchantRouteS1W1: Occupant[] =
  baseTravellingMerchant.map((h, i) => ({
    ...h,
    x: 25 + i,
    y: 22,
    conditionFunction: () => true,
  }));

export const travellingMerchantRouteW1: Occupant[] = baseTravellingMerchant.map(
  (h, i) => ({
    ...h,
    x: 34 + i,
    y: 47,
    conditionFunction: () => true,
  }),
);
