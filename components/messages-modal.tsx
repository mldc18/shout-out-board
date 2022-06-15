import { MessageType } from "../types/shout-out";
import MessageBox from "./message-box";
import { useRouter } from "next/router";
import InfoMessage from "./info-message";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState } from "react";

type MessagesModalProps = {
  isOpen: boolean;
  messages: MessageType[];
  onClickDisplayModal: () => void;
  onClickDeleteMessageHandler: (messageId: number) => void;
};

const MessagesModal = (props: MessagesModalProps) => {
  const { isOpen, messages, onClickDisplayModal, onClickDeleteMessageHandler } =
    props;
  const [infoMessage, setInfoMessage] = useState("");
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const router = useRouter();
  const { name } = router.query;

  async function deleteMessageHandler(messageId: number) {
    const body = {
      id: name,
      messageId,
    };
    const response = await fetch("/api/deleteMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    onClickDeleteMessageHandler(messageId);
    displayInfoMessage(data.message);
  }

  function displayInfoMessage(message: string) {
    setInfoMessage(message);
    setIsDeleteSuccessful(true);
    setTimeout(() => {
      setIsDeleteSuccessful(false);
    }, 3000);
  }

  const messageBoxes = messages.map((message, index) => (
    <MessageBox
      key={index + 100}
      message={message.message}
      messageId={message.id}
      onClickDeleteMessage={deleteMessageHandler}
    />
  ));

  const successMessage = (
    <InfoMessage
      className="text-emerald-500 text-2xl sm:text-4xl font-Rubik mb-5 -translate-y-28"
      infoMessage={infoMessage}
      infoMessageStatus={isDeleteSuccessful}
      infoMessageIcon={<AiOutlineCheckCircle />}
    />
  );

  const messagesContainer =
    messages.length === 0 ? (
      <div className="text-2xl sm:text-4xl font-Karla">
        there are no messages yet...
      </div>
    ) : (
      <div className="overflow-y-scroll messages h-full sm:h-[500px]">
        {messageBoxes}
      </div>
    );

  return (
    <div
      className={`fixed messages-modal z-40 h-screen w-full bg-transparent inset-0 ${
        isOpen ? "visible" : " invisible"
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {successMessage}
        <div className="flex flex-col w-full sm:w-auto px-5 justify-center">
          {messagesContainer}
        </div>
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

export default MessagesModal;
