import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ItemType } from "../../../interfaces/Item";
import { BottomDrawer } from "../../../uiComponents/BottomDrawer/BottomDrawer";
import { Stack } from "../../../uiComponents/Stack/Stack";
import { ItemSprite } from "../../ItemSprite/ItemSprite";
import "./ThrowAwayAction.css";
export const ThrowAwayAction = ({
  item,
  amount,
  discardItem,
}: {
  item: ItemType;
  amount: number;
  discardItem: (x: number) => void;
}) => {
  const [confirmationNeeded, setConfirmationNeeded] = useState<boolean>(false);
  return (
    <div className="throwAwayAction">
      <BottomDrawer
        close={() => setConfirmationNeeded(false)}
        open={confirmationNeeded}
      >
        <div style={{ padding: "2rem" }}>
          <Stack mode="column" alignItems="center">
            <ItemSprite sizeFactor={2} item={item} />
            <h3>Are you sure you want throw to away {item}?</h3>
            <Stack mode="row" flexWrap="nowrap">
              <button
                style={{ border: "1px solid gray" }}
                onClick={() => {
                  discardItem(1);
                  setConfirmationNeeded(false);
                }}
              >
                Throw away 1
              </button>
              <button
                style={{ border: "1px solid gray" }}
                onClick={() => {
                  discardItem(amount);
                  setConfirmationNeeded(false);
                }}
              >
                Throw away all
              </button>
            </Stack>
          </Stack>
        </div>
      </BottomDrawer>
      <FaTrash onClick={() => setConfirmationNeeded(true)} />
    </div>
  );
};
