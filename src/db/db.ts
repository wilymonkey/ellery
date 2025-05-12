import Database from "bun:sqlite";
import twilio from "twilio";
import { sleep } from "~/utils";
import { accountSid, authToken, myNumber } from "./env";
import { migrateTables } from "./migrate";
import { schemas } from "./schema";

export const db = new Database(process.env.DB_FILE_NAME ?? "db.sqlite", {
  create: true,
});

export const client = twilio(accountSid, authToken);

export async function initDb() {
  function minsToNextQuarter(): number {
    const now = new Date();
    const minutes = now.getMinutes();
    return (15 - (minutes % 15)) % 15 || 15;
  }

  console.log("Initialising DB");
  db.exec("PRAGMA journal_mode = WAL;");
  await migrateTables(schemas);
  await sleep(minsToNextQuarter() * 60);

  dbJobs();
}

export async function dbJobs() {
  await fetchMessages();

  await sleep(15 * 60);
  dbJobs();
}

export async function fetchMessages() {
  const insert = db.prepare(`
    INSERT INTO messages (id, number, body, timestamp, is_sent, verified)
    VALUES ($id, $number, $body, $timestamp, $is_sent, TRUE)
    ON CONFLICT(id) DO UPDATE SET verified=TRUE
 `);
  const insertMessages = db.transaction(messages => {
    for (const msg of messages) insert.run(msg);
    return messages.length;
  });

  console.log("Fetching messages from Twilio");

  try {
    const response = await client.messages.list();
    const messages = response.map(message => {
      let number = message.from;
      let is_sent = "FALSE";
      if (myNumber === message.from) {
        number = message.to;
        is_sent = "TRUE";
      }
      return {
        $id: message.sid,
        $number: number,
        $body: message.body,
        $timestamp: message.dateSent.toISOString(),
        $is_sent: is_sent,
      };
    });
    const messagesInserted = insertMessages(messages);
    console.log(`Upserted ${messagesInserted} messages`);
  } catch (error) {
    console.error(`Unable to fetch messages: ${error}`);
  }
}
