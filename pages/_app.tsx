import "../styles/globals.scss";
import { StoreContext } from "storeon/react";
import type { AppProps } from "next/app";

import { store } from "store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
}

export default MyApp;
