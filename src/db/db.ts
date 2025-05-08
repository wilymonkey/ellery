"use server"

import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from "better-sqlite3";
import { query } from '@solidjs/router';
import twilio from 'twilio'

export const db = drizzle(process.env.DB_FILE_NAME!);


const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const number = process.env.TWILIO_NUMBER!;
export const client = twilio(accountSid, authToken)

