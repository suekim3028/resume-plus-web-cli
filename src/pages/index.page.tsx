import { ChatMain, Login } from "@components";
import { useUser } from "@hooks";

export default function Home() {
  const { hasUser } = useUser();
  return !hasUser ? <ChatMain /> : <Login />;
}
