import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "../utils/api";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <div className={"font-poppins"}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
