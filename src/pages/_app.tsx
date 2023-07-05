import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/utils/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </UserProvider>
  );
}
