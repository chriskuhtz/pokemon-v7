import { ItemSprite } from "../../components/ItemSprite/ItemSprite";
import { customItemDescriptions } from "../../constants/customItemDescriptions";
import { useNavigate } from "../../hooks/useNavigate";
import { mulches as mulchNames } from "../../interfaces/Item";
import { Card } from "../../uiComponents/Card/Card";
import { Page } from "../../uiComponents/Page/Page";
import { Stack } from "../../uiComponents/Stack/Stack";
import { BerryBushIcon } from "./components/BerryBushIcon";
import { useFarm } from "./hooks/useFarm";

export const Farm = (): JSX.Element => {
  const { hasEmptySlots, farm, harvest, plant, plantables, mulches } =
    useFarm();

  const navigate = useNavigate();
  return (
    <Page headline="Farm" goBack={() => navigate("FARM", "OVERWORLD")}>
      <Stack mode="column">
        <div
          style={{ border: "1px solid", borderRadius: "8px", padding: "1rem" }}
        >
          <div style={{ paddingBottom: "1rem" }}>
            <strong>
              Plants take 1 hour to grow, but they dont always grow successfully
            </strong>
          </div>

          <Stack mode="column">
            {mulchNames.map((mulch) => (
              <strong style={{ display: "flex", alignItems: "center" }}>
                <ItemSprite item={mulch} /> {mulch}:{" "}
                {customItemDescriptions[mulch]}
              </strong>
            ))}
          </Stack>
        </div>
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
      </Stack>
    </Page>
  );
};
