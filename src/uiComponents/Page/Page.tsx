import { ReactNode, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { portraitMode } from "../../constants/baseConstants";
import "./Page.css";

export const Page = ({
  goBack,
  headline,
  children,
  primaryColor,
  secondaryColor,
}: {
  goBack?: () => void;
  headline: string;
  children: ReactNode;
  primaryColor: string;
  secondaryColor: string;
}) => {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (goBack) {
        goBack();
      }
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [goBack]);

  return (
    <div className="pageWrapper">
      <div
        className="page"
        style={{
          paddingBottom: portraitMode ? "3rem" : undefined,
          background: `linear-gradient(
          	218deg,
          	${primaryColor}, 
          	${secondaryColor}
          )`,
        }}
      >
        <h2 className="headline">
          {goBack ? (
            <IoIosArrowBack
              role="button"
              tabIndex={0}
              onClick={goBack}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (goBack && (e.key === "Backspace" || e.key === "Enter")) {
                  goBack();
                }
              }}
            />
          ) : (
            <div className="placeholder"></div>
          )}{" "}
          {headline}
        </h2>
        {children}
      </div>
    </div>
  );
};
