import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MessageBanner } from "../../components/MessageBanner/MessageBanner";
import { RecoveryTool } from "../../components/RecoveryTool/RecoveryTool";
import { LocationProvider } from "../../hooks/LocationProvider";
import { BaseSizeProvider } from "../../hooks/useBaseSize";
import { GameDataContext } from "../../hooks/useGameData";
import { MessageQueueContext } from "../../hooks/useMessageQueue";
import { SaveFileProvider } from "../../hooks/useSaveFile";
import { ScreenTransitionProvider } from "../../hooks/useScreenTransitionEffects";
import { Router } from "../../modules/Router/Router";
import { Page } from "../Page/Page";
export const MessageContainer = () => {
  const { confirmLatestMessage, addMessage, latestMessage } =
    useContext(MessageQueueContext);
  const { allowedBaseSizes } = useContext(GameDataContext);

  return (
    <ErrorBoundary
      onError={(e) => addMessage({ message: e.message })}
      fallback={
        <Page headline="An unexpected error occured:">
          <RecoveryTool />
        </Page>
      }
    >
      {latestMessage && (
        <MessageBanner
          latestMessage={latestMessage}
          confirmLatestMessage={confirmLatestMessage}
        />
      )}
      <BaseSizeProvider allowedBaseSizes={allowedBaseSizes}>
        <SaveFileProvider>
          <LocationProvider>
            <ScreenTransitionProvider>
              <Router />
            </ScreenTransitionProvider>
          </LocationProvider>
        </SaveFileProvider>
      </BaseSizeProvider>
    </ErrorBoundary>
  );
};
