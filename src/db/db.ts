import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import twilio from 'twilio'
import { sleep } from '~/utils';
import * as schema from '~/db/schema';

export const db = drizzle(process.env.DB_FILE_NAME!, { schema });

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const number = process.env.TWILIO_NUMBER!;
export const client = twilio(accountSid, authToken)

export async function refresh_db() {
  console.log("Refreshing DB");
  await sleep(15 * 60);
  refresh_db()
}
