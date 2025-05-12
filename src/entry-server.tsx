// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { createHandler, StartServer } from "@solidjs/start/server";
import { initDb, dbJobs } from "./db/db";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <MetaProvider>
        <html lang="en">
          <head>
            <meta name="description" content="SMS and Ordering design for a small pharmacy" />
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="favicon.svg" type="image/svg+xml" />
            <link rel="icon" type="image/svg" href="sprites.svg" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      </MetaProvider>
    )} />
));

async function onServerInit() {
  await initDb();
  // Keeps looping, no need to wait on return.
  dbJobs();
}

onServerInit();
