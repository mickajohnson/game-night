import Header from "@/components/Header";
import { UsernameProvider } from "@/contexts/usernameContext";

import dynamic from "next/dynamic";

const Main = dynamic(() => import("@/modules/main"), { ssr: false });

export default function Home() {
  return (
    <UsernameProvider>
      <Header />
      <Main />
    </UsernameProvider>
  );
}
