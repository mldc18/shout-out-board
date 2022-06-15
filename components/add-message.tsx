import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import InfoMessage from "./info-message";
import { MessageType } from "../types/shout-out";

type AddMessageModalProps = {
  isOpen: boolean;
  onClickAddMessageHandler: (newMessage: MessageType) => void;
  onClickDisplayModal: () => void;
};

const AddMessageModal = (props: AddMessageModalProps) => {
  const { isOpen, onClickAddMessageHandler, onClickDisplayModal } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMessageSuccess, setIsMessageSuccess] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const messageRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { name } = router.query;

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsDisabled(true);
    const body = {
      id: name,
      message: messageRef.current!.value,
    };

    const response = await fetch("/api/createMessage", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    data.status === 200 &&
      onClickAddMessageHandler({
        id: data.messageId,
        message: messageRef.current!.value,
      });
    messageRef.current!.value = "";
    setIsDisabled(false);
    setInfoMessage(data.message);

    if (data.status === 200) {
      handleSuccessMessage();
    } else if (data.status === 400) {
      handleErrorMessage();
    }
  }

  function handleSuccessMessage() {
    setIsMessageSuccess(true);
    setTimeout(() => {
      setIsMessageSuccess(false);
    }, 2000);
  }

  function handleErrorMessage() {
    setIsMessageError(true);
    setTimeout(() => {
      setIsMessageError(false);
    }, 2000);
  }

  const successMessage = (
    <InfoMessage
      className="text-emerald-500"
      infoMessage={infoMessage}
      infoMessageStatus={isMessageSuccess}
      infoMessageIcon={<AiOutlineCheckCircle />}
    />
  );

  const errorMessage = (
    <InfoMessage
      className="text-red-500"
      infoMessage={infoMessage}
      infoMessageStatus={isMessageError}
      infoMessageIcon={<AiOutlineCloseCircle />}
    />
  );

  return (
    <div
      className={`fixed messages-modal z-40 h-screen w-full bg-transparent inset-0 ${
        isOpen ? "visible" : " invisible"
      }`}
    >
      <div className="flex flex-col items-center font-Rubik justify-center h-full w-full text-xl sm:text-4xl relative">
        {successMessage}
        {errorMessage}

        <form className="w-full text-center" onSubmit={handleSubmit}>
          <input
            className="font-light w-8/12 sm:w-5/12 p-3 focus:outline-none border-solid border-2 border-black"
            ref={messageRef}
            type="text"
            placeholder="Add message.."
          />
          <input
            className="bg-black p-3 font-light text-white border-solid border-2 disabled:bg-slate-500 border-black"
            disabled={isDisabled}
            value="Submit"
            type="submit"
          />
        </form>
      </div>
      <button
        className="absolute top-2 right-2 z-50 text-black text-5xl font-bold"
        onClick={onClickDisplayModal}
      >
        X
      </button>
    </div>
  );
};

export default AddMessageModal;
