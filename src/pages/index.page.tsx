import { ChatMain, Login } from "@components";

export default function Home() {
  const hasUser = false;
  return hasUser ? <ChatMain /> : <Login />;
}
