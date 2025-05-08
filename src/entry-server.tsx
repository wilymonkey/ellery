// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <MetaProvider>
        <html lang="en">
          <head>
            <meta name="description" content="SMS and Ordering for Healthsave Pharmacy" />
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      </MetaProvider>
    )}
  />
));
