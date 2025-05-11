import Database from 'bun:sqlite';
import twilio from 'twilio'
import { sleep } from '~/utils';
import { initSchema } from './schema';

export const db = new Database(process.env.DB_FILE_NAME ?? "db.sqlite", { create: true });

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const number = process.env.TWILIO_NUMBER!;
export const client = twilio(accountSid, authToken)

export async function initDb() {
  console.log("Initialising DB")
  db.exec('PRAGMA journal_mode = WAL;');
  initSchema();
}

export async function dbJobs() {
  refreshDb()

  await sleep(15 * 60);
  dbJobs()
}

export async function refreshDb() {
  console.log("Refreshing DB");
  try {
    const response = await client.messages.list();
  } catch(error) {
    console.log(`Unable to get messages: ${error}`)
  }
}

