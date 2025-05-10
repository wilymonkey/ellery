import { drizzle } from 'drizzle-orm/better-sqlite3';
import twilio from 'twilio'
import { Result, sleep } from '~/utils';
import * as schema from '~/db/schema';

export const db = drizzle(process.env.DB_FILE_NAME!, { schema });

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const number = process.env.TWILIO_NUMBER!;
export const client = twilio(accountSid, authToken)

export async function db_jobs() {
  console.log("Running database jobs");

  (await refresh_db()).match(
      _ => console.log("DB successfully synced"),
      error => console.log(`Unable to sync DB: ${error}`
  ));

  await sleep(15 * 60);
  db_jobs()
}

export async function refresh_db() {
  const response = await Result.tryAsync(() => client.messages.list());
  return response.map((messages) => {
    console.log(`Found ${messages.length} messages.`)
    for (let message of messages) {
    }
  })
}

