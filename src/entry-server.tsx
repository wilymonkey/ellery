// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { createHandler, StartServer } from "@solidjs/start/server";
import { dbJobs, initDb } from "./db/db";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <MetaProvider>
        <html lang="en">
          <head>
            <meta
              name="description"
              content="SMS and Ordering design for a small pharmacy"
            />
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="favicon.svg" type="image/svg+xml" />
            {assets}
          </head>
          <body id="app">
            {children}
            {scripts}
          </body>
        </html>
      </MetaProvider>
    )}
  />
));

initDb();
