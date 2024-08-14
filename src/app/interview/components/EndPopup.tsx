import { interviewApis } from "@apis";
import { useUser } from "@atoms";
import { useRouter } from "next/navigation";
import PopupTemplate from "./PoupTemplate";

const EndPopup = ({ interviewId }: { interviewId: number }) => {
  const router = useRouter();
  const { user } = useUser();

  const isGuest = user.loginType === "GUEST";

  const exitInterview = () => {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
    router.replace("/");
    interviewApis.deleteInterview({ id: interviewId });
  };

  return isGuest ? (
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
          onClick: () => {
            if (document.fullscreenEnabled) {
              document.exitFullscreen();
            }
            router.replace("/sign-in");
          },
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
          onClick: () => {
            if (document.fullscreenEnabled) {
              document.exitFullscreen();
            }
            router.replace("/result");
          },
        },
      ]}
    />
  );
};

export default EndPopup;
