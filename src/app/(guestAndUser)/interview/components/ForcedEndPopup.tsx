import { useRouter } from "next/navigation";
import PopupTemplate from "./PoupTemplate";

const ForcedEndPopup = () => {
  const router = useRouter();

  return (
    <PopupTemplate
      title={"면접이 강제 종료되었습니다."}
      body={`강제종료 된 면접은 면접 결과가 저장되지 않아요.`}
      buttons={[
        {
          title: "메인 화면 돌아가기",
          onClick: () => {
            router.replace("/");
          },
        },
      ]}
    />
  );
};

export default ForcedEndPopup;
