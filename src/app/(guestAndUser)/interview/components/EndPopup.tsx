import { interviewApis } from "@apis";
import { Spinner } from "@chakra-ui/react";
import { EventLogger, PopUp } from "@components";

import { useUserValue } from "@atoms";
import { Flex } from "@uis";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useInterviewInfoContext } from "../InterviewInfoContext";
import PopupTemplate from "./PoupTemplate";

const EndPopupComponent = () => {
  const router = useRouter();

  const { isGuestUser } = useUserValue();
  const { interviewInfo } = useInterviewInfoContext();

  const exitInterview = () => {
    EventLogger.log("interview_finish_popup_button", {
      popup_title: "면접장 나가기",
    });
    router.replace("/");

    interviewApis.deleteInterview({ id: interviewInfo.interviewId });
  };

  const goToSignUp = () => {
    EventLogger.log("interview_finish_popup_button", {
      popup_title: "회원가입",
    });

    router.replace("/sign-in");
  };

  const goToResult = () => {
    router.replace("/result");
  };

  useEffect(() => {
    EventLogger.log("InterviewFinishPopUp", {
      popup_title: "수고하셨습니다! 면접이 끝났어요!",
    });
  }, []);
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
      body={`면접 연습 결과 페이지에서 연습 결과를 확인할 수 있어요.\n결과 분석에는 시간이 소요될 수 있어요!`}
      buttons={[
        {
          title: "면접 결과 확인하기",
          onClick: goToResult,
        },
      ]}
    />
  );
};

const EndPopup = () => {
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
};

export default EndPopup;
