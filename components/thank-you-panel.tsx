import ThankYou from "./thank-you";

type ThankYouPanelProps = {
  messagesLength: number;
  name?: string;
  onClickHandleDisplayAddMessagesModal: () => void;
  onClickHandleDisplaySeeMessagesModal: () => void;
};

const ThankYouPanel = (props: ThankYouPanelProps) => {
  const {
    messagesLength,
    name,
    onClickHandleDisplayAddMessagesModal,
    onClickHandleDisplaySeeMessagesModal,
  } = props;

  return (
    <>
      <div className="text-4xl sm:text-8xl tracking-tight font-Rubik font-light h-1/4 sm:h-2/4 w-full flex flex-col items-center justify-center">
        <ThankYou />
        <div className="-translate-y-4 sm:translate-y-0">{name}</div>
      </div>
      <div className="flex justify-center text-lg sm:text-3xl tracking-tighter w-full font-Karla font-light space-x-10">
        <button
          className="decoration-indigo-500"
          onClick={onClickHandleDisplayAddMessagesModal}
        >
          send <span className="font-bold">{name}</span> a message
        </button>
        <button
          className="decoration-indigo-500"
          onClick={onClickHandleDisplaySeeMessagesModal}
        >
          see all messages ({messagesLength})
        </button>
      </div>
    </>
  );
};

export default ThankYouPanel;
