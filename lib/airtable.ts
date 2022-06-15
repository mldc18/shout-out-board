const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("shout-out");

const getShoutout = (shoutout: Array<any>) => {
  return shoutout.map((record) => {
    return {
      ...record.fields,
    };
  });
};

export { table, getShoutout };
