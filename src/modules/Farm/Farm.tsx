import { useCallback, useContext, useState } from "react";
import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { ONE_HOUR } from "../../constants/baseConstants";
import { customItemDescriptions } from "../../constants/customItemDescriptions";
import { startBlocker } from "../../functions/TimedEvent";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { useNavigate } from "../../hooks/useNavigate";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { joinInventories } from "../../interfaces/Inventory";
import {
  ApricornType,
  BerryType,
  isApricorn,
  isBerry,
  mulches as mulchNames,
} from "../../interfaces/Item";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { SelectionBar } from "../../uiComponents/SelectionBar/SelectionBar";
import { Stack } from "../../uiComponents/Stack/Stack";
import { BerryBushIcon } from "./components/BerryBushIcon";
import { useFarm } from "./hooks/useFarm";

export const Farm = (): JSX.Element => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<string | undefined>(
    "MULCH INFO",
  );
  return (
    <Page headline="Farm" goBack={() => navigate("FARM", "OVERWORLD")}>
      <SelectionBar
        options={[
          { key: "MULCH INFO", label: "MULCH INFO" },
          { key: "PLANTS", label: "PLANTS" },
          { key: "TREES", label: "TREES" },
        ]}
        select={setActivePage}
        selected={activePage}
        allowUndefined={false}
      />

      <Stack mode="column">
        {activePage === "MULCH INFO" && <MulchInfo />}
        {activePage === "TREES" && <TreeFarm />}
        {activePage === "PLANTS" && <PlantFarm />}
      </Stack>
    </Page>
  );
};

const MulchInfo = () => {
  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <div style={{ paddingBottom: "1rem" }}>
        <strong>
          Plants take 1 hour to grow, but they dont always grow successfully
        </strong>
      </div>

      <Stack mode="column">
        {mulchNames.map((mulch) => (
          <strong style={{ display: "flex", alignItems: "center" }}>
            <ItemSprite item={mulch} /> {mulch}: {customItemDescriptions[mulch]}
          </strong>
        ))}
      </Stack>
    </div>
  );
};

const PlantFarm = () => {
  const {
    hasEmptySlots,
    numberOfEmptySlots,
    farm,
    harvest,
    plant,
    plantables,
    mulches,
  } = useFarm();
  return (
    <>
      <h3>Manage Plants ({numberOfEmptySlots} Empty Slots):</h3>

      {farm.plants.map((bush) => {
        const ready = bush.readyAt < new Date().getTime();

        return (
          <Card
            key={bush.id}
            icon={<BerryBushIcon bush={bush} />}
            content={
              <div>
                <h5>
                  {bush.type}
                  {ready && !bush.successful && `  (withered)`}
                </h5>

                {!ready && (
                  <strong>
                    Ready at {new Date(bush.readyAt).toLocaleTimeString()}
                  </strong>
                )}
              </div>
            }
            actionElements={
              ready
                ? [
                    <button onClick={() => harvest(bush.id)}>
                      {bush.successful ? "harvest" : "remove"}
                    </button>,
                  ]
                : []
            }
          />
        );
      })}
      {hasEmptySlots ? (
        plantables.map(([berry, amount]) => (
          <Card
            key={berry}
            icon={<ItemSprite item={berry} />}
            content={<strong>{`plant a ${berry} (${amount} in bag)`}</strong>}
            actionElements={[
              <button onClick={() => plant(berry)}>{`plant`}</button>,
              ...mulches.map(([m]) => (
                <button
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => plant(berry, m)}
                >
                  {`plant with ${m}`}
                  <ItemSprite item={m} />
                </button>
              )),
            ]}
          />
        ))
      ) : (
        <Card
          icon={<ItemSprite item={"sitrus-berry"} />}
          content={`No more empty slots`}
          actionElements={[]}
        />
      )}
    </>
  );
};

const TreeFarm = () => {
  const { saveFile, patchSaveFileReducer } = useContext(SaveFileContext);
  const { addMessage } = useContext(MessageQueueContext);

  const treeLimit = 6;

  const removeTree = useCallback(
    (tree: ApricornType | BerryType, index: number) => {
      addMessage({
        icon: <ItemSprite item={tree} />,
        message: `removed the ${tree} tree`,
      });
      patchSaveFileReducer({
        farm: {
          ...saveFile.farm,
          trees: (saveFile.farm.trees ?? [])?.map((_, i) => {
            if (i === index) {
              return undefined;
            }
            return _;
          }),
        },
      });
    },
    [addMessage, patchSaveFileReducer, saveFile.farm],
  );
  const plantTree = useCallback(
    (tree: ApricornType | BerryType) => {
      const firstEmptyIndex = (saveFile.farm.trees ?? []).findIndex((x) => !x);
      console.log(saveFile.farm.trees);
      if (firstEmptyIndex === -1) {
        addMessage({
          icon: <ItemSprite item={tree} />,
          message: `could not plant ${tree} tree`,
        });
        return;
      }

      const adjustedTrees = (saveFile.farm.trees ?? [])?.map((entry, index) => {
        if (index === firstEmptyIndex) {
          return tree;
        }
        return entry;
      });
      addMessage({
        icon: <ItemSprite item={tree} />,
        message: `planted a ${tree} tree`,
      });

      const isGardener = saveFile.trait === "gardener";

      const time = ONE_HOUR * (isGardener ? 1 : 2);

      patchSaveFileReducer({
        ...startBlocker(saveFile, `planted-${tree}-${firstEmptyIndex}`, time),
        bag: joinInventories(saveFile.bag, { [tree]: -1 }),
        farm: {
          ...saveFile.farm,
          trees: adjustedTrees,
        },
      });
    },
    [addMessage, patchSaveFileReducer, saveFile],
  );

  const berriesAndApricorns: (BerryType | ApricornType)[] = Object.entries(
    saveFile.bag,
  )
    .filter(([, amount]) => {
      return amount > 0;
    })
    .map((entry) => entry[0])
    .filter<BerryType | ApricornType>(
      (item) => isBerry(item) || isApricorn(item),
    );

  if (!saveFile.campUpgrades["tree farm"]) {
    return <>Upgrade the Farm to manage trees</>;
  }

  return (
    <Stack mode="column">
      <h3>
        Manage trees ({saveFile.farm.trees?.filter((f) => !f).length} Empty
        Slots):
      </h3>
      {saveFile.farm.trees?.map((tree, index) =>
        tree ? (
          <button onClick={() => removeTree(tree, index)}>
            <Stack alignItems="center" mode="row" gap={1}>
              <ItemSprite grayscale item={tree} />
              <span>Remove {tree} tree</span>
            </Stack>
          </button>
        ) : (
          <></>
        ),
      )}
      {((saveFile.farm.trees ?? []).filter((a) => !!a).length ?? 0) <
        treeLimit &&
        berriesAndApricorns.map((tree) => (
          <button onClick={() => plantTree(tree)}>
            <Stack alignItems="center" mode="row" gap={1}>
              <ItemSprite item={tree} /> <span>Plant a {tree} tree</span>
            </Stack>
          </button>
        ))}
    </Stack>
  );
};
