import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMessages } from "../lib/shout-out";
import MessagesModal from "../components/messages-modal";
import AddMessageModal from "../components/add-message";
import { GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import TryAgain from "../components/try-again";
import ThankYouPanel from "../components/thank-you-panel";
import { MessageType } from "../types/shout-out";
import Head from "next/head";

type ShoutOutPageProps = {
  messages: MessageType[];
};

const ShoutOutPage = (props: ShoutOutPageProps) => {
  const { messages } = props;
  const [isAddMessagesModalOpen, setIsAddMessagesModalOpen] = useState(false);
  const [isSeeMessagesModalOpen, setIsSeeMessagesModalOpen] = useState(false);
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [isPageRendered, setisPageRendered] = useState(false);
  const [pageStatus, setPageStatus] = useState(0);
  const messagesLength = currentMessages.length;

  const router = useRouter();
  const { name } = router.query;

  function addMessageHandler(newMessage: MessageType) {
    setCurrentMessages((prevState) => {
      return [...prevState, newMessage];
    });
  }

  function deleteMessageHandler(messageId: number) {
    const filteredMessages = currentMessages.filter(
      (currentMessage) => currentMessage.id !== messageId
    );

    setCurrentMessages(filteredMessages);
  }

  function handleDisplaySeeMessagesModal() {
    setIsSeeMessagesModalOpen((prevState) => !prevState);
  }

  function handleDisplayAddMessagesModal() {
    setIsAddMessagesModalOpen((prevState) => !prevState);
  }

  async function handleCreateShoutout() {
    try {
      const body = {
        id: name,
      };
      const response = await fetch("/api/createShoutout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      data.status == 400 ? setPageStatus(400) : setPageStatus(200);
    } catch (err) {
      console.log("Error creating shoutout", err);
      throw new Error();
    }
  }

  useEffect(() => {
    if (isPageRendered) {
      handleCreateShoutout();
    } else {
      setisPageRendered(true);
    }
  }, [isPageRendered]);

  const displayContent = () => {
    if (pageStatus == 200) {
      return (
        <>
          <Head>
            <title>Shoutout to {name}!</title>
            <meta
              property="og:shout-out-generator"
              content="shout-out generator"
              key="shout-out-generator"
            />
          </Head>
          <MessagesModal
            isOpen={isSeeMessagesModalOpen}
            messages={currentMessages}
            onClickDeleteMessageHandler={deleteMessageHandler}
            onClickDisplayModal={handleDisplaySeeMessagesModal}
          />
          <AddMessageModal
            isOpen={isAddMessagesModalOpen}
            onClickAddMessageHandler={addMessageHandler}
            onClickDisplayModal={handleDisplayAddMessagesModal}
          />
          <ThankYouPanel
            messagesLength={messagesLength}
            name={name as string}
            onClickHandleDisplayAddMessagesModal={handleDisplayAddMessagesModal}
            onClickHandleDisplaySeeMessagesModal={handleDisplaySeeMessagesModal}
          />
        </>
      );
    } else if (pageStatus == 400) {
      <TryAgain />;
    } else {
      <div className="text-4xl sm:text-8xl tracking-tight font-Rubik">
        loading...
      </div>;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      {displayContent()}
    </div>
  );
};

export default ShoutOutPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.params as ParsedUrlQuery;
  const messages = await getMessages(name as string);

  return {
    props: {
      messages,
    },
  };
}
