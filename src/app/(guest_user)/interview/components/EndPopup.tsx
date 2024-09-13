import { interviewApis } from "@apis";
import { Spinner } from "@chakra-ui/react";
import { PopUp } from "@components";

import { useUser } from "@atoms";
import { Flex } from "@uis";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useInterviewContext } from "../InterviewContext";
import PopupTemplate from "./PoupTemplate";

const EndPopupComponent = () => {
  const router = useRouter();

  const { isGuestUser } = useUser();
  const { interviewInfo } = useInterviewContext();

  const exitInterview = () => {
    router.replace("/");
    interviewApis.deleteInterview({ id: interviewInfo.interviewId });
  };

  const goToSignUp = () => {
    router.replace("/sign-in");
  };

  const goToResult = () => {
    router.replace("/result");
  };
  return isGuestUser ? (
    <PopupTemplate
      title={"수고하셨습니다! 면접이 끝났어요!"}
      body={`아쉽게도 비회원은 면접 연습 결과를 확인할 수 없어요.\n회원가입 후 맞춤형 면접 분석을 받아보세요!`}
      buttons={[
        {
          title: "면접장 나가기",
          onClick: exitInterview,
        },
        {
          title: "회원가입",
          onClick: goToSignUp,
        },
      ]}
    />
  ) : (
    <PopupTemplate
      title={"수고하셨습니다! 면접이 끝났어요!"}
      body={`면접 연습 결과 페이지에서 연습 결과를 확인할 수 있어요.\n결과 분석이 끝나면 이메일로 알려드릴게요!`}
      buttons={[
        {
          title: "면접 결과 확인하기",
          onClick: goToResult,
        },
      ]}
    />
  );
};

export default function EndPopup() {
  return (
    <Suspense
      fallback={
        <PopUp visible={true}>
          <Flex
            bgColor={"Static/White"}
            rounded={24}
            pt={48}
            pb={24}
            px={61}
            alignItems={"center"}
          >
            <Spinner color="gray" />
          </Flex>
        </PopUp>
      }
    >
      <EndPopupComponent />
    </Suspense>
  );
}
