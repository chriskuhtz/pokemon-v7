import React, { ReactNode } from "react";

export const ListItem = ({
  onClick,
  backgroundColor,
  primaryIcon,
  content,
  additionalContent,
  additionalIcons,
  infoButton,
  hint,
}: {
  onClick?: () => void;
  backgroundColor?: string;
  primaryIcon: React.JSX.Element;
  content: ReactNode;
  hint?: string;
  additionalContent?: React.JSX.Element;
  additionalIcons?: React.JSX.Element[];
  infoButton: React.JSX.Element;
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: ".25rem 0",
        backgroundColor,
        borderRadius: 4,
        borderTopLeftRadius: 16,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          paddingLeft: "0.25rem",
        }}
      >
        {primaryIcon}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <strong>
            {content}
            {hint && `(${hint})`}
            {additionalContent ? ":" : ""}
          </strong>
          {additionalContent}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          paddingRight: "0.25rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {additionalIcons?.map((a, index) => (
          <React.Fragment key={index}>{a}</React.Fragment>
        ))}
        {infoButton}
      </div>
    </div>
  );
};
