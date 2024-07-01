import { Stack, Text } from "@chakra-ui/react";
import { TopBarContainer } from "@components";

export default function Home() {
  // const router = useRouter();
  // const { hasUser } = useUser();

  return (
    <TopBarContainer>
      <Stack direction={"row"}>
        <Stack>
          <Text>나의 레쥬메를 기반으로 딱 맞는 화상 면접을 연습해보세요.</Text>
          {/* <Button onClick={() => router.push("/interview")}>시작하기</Button>
        {!hasUser && (
          <Link as={NextLink} href="/interview">
            비회원으로 시작하기
          </Link>
        )} */}
        </Stack>
      </Stack>
    </TopBarContainer>
  );
}
