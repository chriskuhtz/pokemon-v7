import { FaRegCircleCheck } from "react-icons/fa6";
import { battleSpriteSize } from "../../constants/baseConstants";
import { Message } from "../../hooks/useMessageQueue";
import { Banner } from "../../uiComponents/Banner/Banner";

export const MessageBanner = ({
  latestMessage,
  confirmLatestMessage,
}: {
  latestMessage: Message;
  confirmLatestMessage: () => void;
}) => {
  return (
    <Banner onClick={confirmLatestMessage}>
      <h2
        style={{
          display: "grid",
          gap: "1rem",
          alignItems: "center",
          gridTemplateColumns: "1fr 10fr 1fr",
          padding: "0 2rem",
        }}
      >
        {latestMessage.icon ? <span>{latestMessage.icon}</span> : <span></span>}
        <span style={{ textAlign: "center" }}>
          {latestMessage?.message}
        </span>{" "}
        {!latestMessage.needsNoConfirmation && (
          <FaRegCircleCheck size={battleSpriteSize} />
        )}
      </h2>
    </Banner>
  );
};
