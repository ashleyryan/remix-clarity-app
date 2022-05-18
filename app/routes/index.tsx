
// this shims the global `window` object in node
import '@lit-labs/ssr/lib/install-global-dom-shim.js';

import { ClientOnly } from "remix-utils";

// this will fail because there is a number of browser functions called globally in clarity
import { CdsButton } from '@cds/react/button';

/**
 * Running without the shim will return a `window is not defined` error from Lit
 * 
 * Installing the shim fixes that,
 *  but then the CdsButton import errors due to browser code being executed from Clarity
 *  
 *  But with the shim of window and document, there's now no good way to check if code is running on the server
 */

export default function Index() {

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      {/* This is the recommendation from the remix team - only render on the client, but rendering isn't the issue with Lit */}
      <ClientOnly>{() => <CdsButton>My Button</CdsButton>}</ClientOnly>
    </main>
  );
}
