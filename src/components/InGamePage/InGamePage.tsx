import React, { ReactNode, useContext, useState } from "react";
import { SaveFileContext } from "../../hooks/useSaveFile";
import { traitColors } from "../../interfaces/Trait";
import { Page } from "../../uiComponents/Page/Page";

export const InGamePageContext = React.createContext(
  {} as {
    primaryColor: string;
    setPrimaryColor: (x: string) => void;
  },
);

const InGamePageProvider = ({ children }: { children: ReactNode }) => {
  const { saveFile } = useContext(SaveFileContext);
  const [primaryColor, setPrimaryColor] = useState<string>(
    (saveFile.trait && traitColors[saveFile.trait]) ??
      "rgba(99, 144, 240, 0.5) 100%",
  );
  return (
    <InGamePageContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
      }}
    >
      {children}
    </InGamePageContext.Provider>
  );
};

export const InGamePage = ({
  goBack,
  headline,
  children,
}: {
  goBack?: () => void;
  headline: string;
  children: ReactNode;
}) => {
  return (
    <InGamePageProvider>
      <Content goBack={goBack} headline={headline}>
        {children}
      </Content>
    </InGamePageProvider>
  );
};

const Content = ({
  goBack,
  headline,
  children,
}: {
  goBack?: () => void;
  headline: string;
  children: ReactNode;
}) => {
  const { primaryColor } = useContext(InGamePageContext);
  return (
    <Page
      goBack={goBack}
      headline={headline}
      secondaryColor={primaryColor}
      primaryColor={"lightgray"}
    >
      {children}
    </Page>
  );
};
