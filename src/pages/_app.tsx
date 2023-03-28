import { type AppType } from "next/app";
import "../styles/globals.css";
import { api } from "../utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      {/* <ClerkProvider {...pageProps}> */}
      <Head>
        <title>My Music Studio</title>
        <meta name="description" content="My Music Studio Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      {/* </ClerkProvider> */}
    </>
  );
};

export default api.withTRPC(MyApp);
