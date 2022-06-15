import { table, getShoutout } from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { generateRandomId } from "../../utils/idGeneratorUtils";

const createMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, message } = req.body;

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

          if (message === "") {
            res.status(400).json({
              message: "Message cannot be blank",
              status: 400,
            });
          } else if (message.length >= 28) {
            res.status(400).json({
              message: "Message is too long (28 char limit)",
              status: 400,
            });
          } else {
            const messageId = generateRandomId();
            messages.push({ id: messageId, message });
            const updateShoutout = await table.update([
              {
                id: findShoutoutRecord[0].id,
                fields: {
                  id,
                  messages: JSON.stringify(messages),
                },
              },
            ]);
            res.status(200).json({
              message: "Message Sent",
              messageId: messageId,
              status: 200,
            });
          }
        } else {
          res.status(400).json({ message: "Error occured" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: `Error occured ${err}` });
    }
  }
};

export default createMessage;
