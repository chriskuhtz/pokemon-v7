import { useCallback, useContext } from "react";
import { RoutesType } from "../interfaces/Routing";
import { SaveFileContext } from "./useSaveFile";

export const useNavigate = (): ((
  currentRoute: RoutesType,
  newRoute: RoutesType,
  stepsWalked?: number,
  focusedMonId?: string,
) => void) => {
  const { setActiveTabReducer, navigateAwayFromOverworldReducer } =
    useContext(SaveFileContext);

  return useCallback(
    (
      currentRoute: RoutesType,
      newRoute: RoutesType,
      stepsWalked?: number,
      focusedMonId?: string,
    ) => {
      if (currentRoute === "OVERWORLD") {
        navigateAwayFromOverworldReducer(
          { activeTab: newRoute, focusedMonId: focusedMonId },
          stepsWalked ?? 0,
        );
      } else setActiveTabReducer(newRoute);
    },
    [navigateAwayFromOverworldReducer, setActiveTabReducer],
  );
};
