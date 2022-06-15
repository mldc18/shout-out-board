import { table, getShoutout } from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { MessageType } from "../../types/shout-out";

const deleteMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, messageId } = req.body;

    try {
      if (id) {
        const findShoutoutRecord = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findShoutoutRecord.length !== 0) {
          const shoutoutRecord = getShoutout(findShoutoutRecord);
          const [{ messages: rawMessages }] = shoutoutRecord;
          let messages = JSON.parse(rawMessages);

          const filteredMessages = messages.filter(
            (message: MessageType) => message.id != messageId
          );

          const updateShoutout = await table.update([
            {
              id: findShoutoutRecord[0].id,
              fields: {
                id,
                messages: JSON.stringify(filteredMessages),
              },
            },
          ]);
          res.status(200).json({
            message: "Message Deleted",
            status: 200,
          });
        } else {
          res.status(400).json({ message: "Error occured" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: `Error occured ${err}` });
    }
  }
};

export default deleteMessage;
