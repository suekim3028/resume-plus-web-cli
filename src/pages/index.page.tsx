import { AppHead, Login, Main } from "@components";

export default function Home() {
  const hasUser = false;
  return (
    <>
      <AppHead />
      {hasUser ? <Login /> : <Main />}
    </>
  );
}
