import { AiOutlineCloseCircle } from "react-icons/ai";

type MessageBoxProps = {
  message: string;
  messageId: number;
  onClickDeleteMessage: (messageId: number) => void;
};

const MessageBox = (props: MessageBoxProps) => {
  const { message, messageId, onClickDeleteMessage } = props;

  return (
    <div className="flex border-solid border-2 rounded-lg p-4 text-black text-lg sm:text-xl md:text-3xl bg-inherit my-1 font-Karla">
      <div className="mr-5">{message}</div>

      <div
        className="ml-auto text-slate-200 hover:text-red-400"
        onClick={() => onClickDeleteMessage(messageId)}
      >
        <AiOutlineCloseCircle />
      </div>
    </div>
  );
};

export default MessageBox;
