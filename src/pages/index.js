import { UsernameProvider } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("@/modules/main"), { ssr: false });

export default function Home() {
  return (
    <UsernameProvider>
      <Main />
    </UsernameProvider>
  );
}
