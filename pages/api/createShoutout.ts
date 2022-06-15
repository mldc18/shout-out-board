import { table, getShoutout } from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { nameValidator } from "../../utils/nameValidatorUtils";

async function createShoutout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      const isIdValid = nameValidator(id);
      if (id && isIdValid) {
        const findShoutoutData = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findShoutoutData.length !== 0) {
          const shoutoutData = getShoutout(findShoutoutData);
          res.status(200).json({ shoutoutData });
        } else {
          const createShoutout = await table.create([
            {
              fields: {
                id,
                messages: JSON.stringify([]),
              },
            },
          ]);

          const shoutoutData = getShoutout(createShoutout);
          res.status(200).json(shoutoutData);
        }
      } else {
        res.status(400).json({ message: "id is invalid", status: 400 });
      }
    } catch (err) {
      res.status(500).json({ message: "error creating or finding shoutout" });
    }
  }
}

export default createShoutout;
