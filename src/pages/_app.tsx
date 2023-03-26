import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>My Music Studio</title>
        <meta name="description" content="My Music Studio Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"font-poppins"}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
