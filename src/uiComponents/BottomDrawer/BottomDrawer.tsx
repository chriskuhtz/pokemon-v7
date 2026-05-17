import { IoMdCloseCircle } from "react-icons/io";
import { battleSpriteSize, portraitMode } from "../../constants/baseConstants";

export const BottomDrawer = ({
  open,
  close,
  children,
}: {
  open: boolean;
  close?: () => void;
  children: React.JSX.Element;
}) => {
  if (!open) {
    return <></>;
  }
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100dvw",
        maxHeight: "40%",
        height: portraitMode ? "40%" : undefined,
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 9000,
        overflow: "scroll",
      }}
    >
      {close && (
        <IoMdCloseCircle
          role="button"
          size={battleSpriteSize}
          tabIndex={0}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") {
              close();
            }
          }}
          onClick={close}
        />
      )}
      {children}
    </div>
  );
};
