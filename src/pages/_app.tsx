import { type AppType } from "next/app";
import "../styles/globals.css";
import { api } from "../utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>My Music Studio</title>
        <meta name="description" content="My Music Studio Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
