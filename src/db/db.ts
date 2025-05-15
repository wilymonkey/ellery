import Database from "bun:sqlite";
import twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { sleep } from "~/utils";
import { accountSid, authToken, myNumber } from "./env";
import { migrateTables } from "./migrate";
import { schemas } from "./schema";

export const db = new Database(process.env.DB_FILE_NAME ?? "db.sqlite", {
  create: true,
});

export const twilioClient = twilio(accountSid, authToken);

export async function initDb() {
  function minsToNextQuarter(): number {
    const now = new Date();
    const minutes = now.getMinutes();
    return (15 - (minutes % 15)) % 15 || 15;
  }

  console.log("Initialising DB");
  db.exec("PRAGMA journal_mode = WAL;");
  await migrateTables(schemas);
  console.log(db.query("SELECT * from messages").all());
  await sleep(minsToNextQuarter() * 60);

  dbJobs();
}

export async function dbJobs() {
  await fetchMessages();

  await sleep(15 * 60);
  dbJobs();
}

export function insertMessageInstance(message: MessageInstance) {
  const insert = db.prepare(`
    INSERT INTO messages (id, number, body, timestamp, is_sent)
    VALUES ($id, $number, $body, $timestamp, $is_sent)
    ON CONFLICT (id) DO NOTHING
 `);
  let number = message.from;
  let is_sent = "FALSE";
  if (myNumber === message.from) {
    number = message.to;
    is_sent = "TRUE";
  }
  insert.run({
    $id: message.sid,
    $number: number,
    $body: message.body,
    $timestamp: message.dateCreated.toISOString(),
    $is_sent: is_sent,
  });
}

export async function fetchMessages() {
  const insertMessages = db.transaction((messages: MessageInstance[]) => {
    for (const msg of messages) insertMessageInstance(msg);
    return messages.length;
  });

  console.log("Fetching messages from Twilio");

  try {
    const response = await twilioClient.messages.list();
    const messagesInserted = insertMessages(response);
    console.log(`Upserted ${messagesInserted} messages`);
  } catch (error) {
    console.error(`Unable to fetch messages: ${error}`);
  }
}
