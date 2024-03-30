import { useStepContext } from "@contexts";
import { Font, Layout as L } from "@design-system";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

const EnvCheck = () => {
  const { goNext } = useStepContext();
  const [video, setVideo] = useState(true); // TODO: 화면 녹화 시 setVideo

  return (
    <L.FlexCol
      w={"100%"}
      h={"100%"}
      pv={30}
      ph={30}
      alignItems="flex-end"
      justifyContent="flex-end"
    >
      <L.FlexCol
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        p={10}
        outline={"GRAY_400"}
        rounded={10}
        mb={20}
      >
        <Font.Body
          type={"16_medium_multi"}
          color={"PRIMARY_500"}
          textAlign="center"
        >
          “안녕하세요, 잘 부탁드립니다.”
        </Font.Body>
        <Font.Body
          type={"16_medium_multi"}
          color={"PRIMARY_500"}
          textAlign="center"
        >
          카메라 정면을 응시한 상태로, 5초 이내에 위 문구를 읽어주세요.
        </Font.Body>
      </L.FlexCol>
      <L.FlexRow>
        <Button title={"다시하기"} />
        <Button title={"확인"} onClick={goNext} />
      </L.FlexRow>
    </L.FlexCol>
  );
};

export default React.memo(EnvCheck);
