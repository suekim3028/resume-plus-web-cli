import { interviewApis } from "@apis";
import { EventLogger } from "@components";
import { useRouter } from "next/navigation";
import { useInterviewInfoContext } from "../InterviewInfoContext";
import PopupTemplate from "./PoupTemplate";

const ExitPopup = ({ closePopup }: { closePopup: () => void }) => {
  const router = useRouter();
  const { interviewInfo } = useInterviewInfoContext();
  const title = `면접 내용이 모두 사라집니다.\n정말 나가시겠습니까?`;
  return (
    <PopupTemplate
      title={title}
      body={`연습을 완료하면 면접 연습 결과 페이지에서\n분석 결과를 확인할 수 있어요`}
      buttons={[
        {
          title: "취소",
          onClick: () => {
            closePopup();
            EventLogger.log("interview_exit_popup_button", {
              action: "취소",
              label: title,
            });
          },
        },
        {
          title: "면접 나가기",
          onClick: () => {
            if (document.fullscreenElement) {
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
