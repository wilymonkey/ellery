function requireEnv(key: string): string {
  const value = Bun.env[key];

  if (value === undefined) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }

  if (value.trim() === "") {
    console.error(`❌ Empty environment variable: ${key}`);
    process.exit(1);
  }

  return value;
}

export const accountSid = requireEnv("TWILIO_ACCOUNT_SID");
export const authToken = requireEnv("TWILIO_AUTH_TOKEN");
export const myNumber = requireEnv("TWILIO_NUMBER");
