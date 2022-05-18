
// this shims the global `window` object in node
// import '@lit-labs/ssr/lib/install-global-dom-shim.js';

import React, { useEffect, useState } from "react";

function dynamic<P extends {}>(importFn: () => Promise<React.ComponentType<P>>) {
  let hydrating = true;
  let Component: React.ComponentType<P>;

  return function DynamicComponent(props: P) {
    let [hydrated, setHydrated] = useState(() => !hydrating);
    useEffect(() => {
      if (hydrating) {
        importFn().then(m => {
          Component = m;
          setHydrated(true);
          hydrating = false;
        })
      }
    }, []);
    return hydrated && Component ? <Component {...props} /> : <div>On the server</div>;
  }
}


const CdsButton = dynamic(async () => {
  const Component = await import('@cds/react/button').then(m => m.CdsButton);
  return Component;
});


export default function Index() {

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <CdsButton>My Button</CdsButton>
    </main>
  );
}
