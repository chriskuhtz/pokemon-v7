import { ReactNode, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "./Page.css";

export const Page = ({
  goBack,
  headline,
  children,
}: {
  goBack?: () => void;
  headline: string;
  children: ReactNode;
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
      <div className="page">
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
