import { interviewApis } from "@apis";
import { useRouter } from "next/navigation";
import { useInterviewContext } from "../InterviewContext";
import PopupTemplate from "./PoupTemplate";

const ExitPopup = ({ closePopup }: { closePopup: () => void }) => {
  const router = useRouter();
  const { interviewInfo } = useInterviewContext();
  return (
    <PopupTemplate
      title={`면접 내용이 모두 사라집니다.\n정말 나가시겠습니까?`}
      body={`연습을 완료하면 면접 연습 결과 페이지에서\n분석 결과를 확인할 수 있어요`}
      buttons={[
        { title: "취소", onClick: closePopup },
        {
          title: "면접 나가기",
          onClick: () => {
            if (document.fullscreenEnabled) {
              document.exitFullscreen();
            }
            interviewApis.deleteInterview({ id: interviewInfo.interviewId });
            router.replace("/");
          },
        },
      ]}
    />
  );
};

export default ExitPopup;
