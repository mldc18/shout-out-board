import { ReactNode } from "react";
import { IconType } from "react-icons";

type InfoMessageProps = {
  className: string;
  infoMessageStatus: boolean;
  infoMessage: string;
  infoMessageIcon: ReactNode;
};

const InfoMessage = (props: InfoMessageProps) => {
  const { className, infoMessage, infoMessageStatus, infoMessageIcon } = props;

  return (
    <div
      className={`${className} flex absolute top-1/4 ${
        infoMessageStatus ? "visible" : "invisible"
      }`}
    >
      {infoMessage}
      <span className="ml-2">{infoMessageIcon}</span>
    </div>
  );
};

export default InfoMessage;
