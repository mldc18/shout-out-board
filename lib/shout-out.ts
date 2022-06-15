import { table } from "./airtable";

type shoutoutType = {
  fields: Object;
};

type shoutoutFields = {
  id: string;
  messages: Array<string>;
};

export const getMessages = async (id: string) => {
  const findShoutoutData = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  const shoutoutFields = findShoutoutData.map((datum: shoutoutType) => {
    return {
      ...datum.fields,
    };
  });

  const rawMessages = shoutoutFields[0]?.messages;

  return rawMessages ? JSON.parse(rawMessages) : [];
};

export const getIds = async () => {
  const findShoutoutData = await table
    .select({
      maxRecords: 100,
    })
    .firstPage();

  const shoutoutFields = findShoutoutData.map((datum: shoutoutType) => {
    return {
      ...datum.fields,
    };
  });

  const shoutoutPaths = shoutoutFields.map((shoutoutField: shoutoutFields) => {
    return {
      name: shoutoutField.id,
    };
  });

  return shoutoutPaths;
};
