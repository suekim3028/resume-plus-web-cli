import { Stack } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { useStepContext } from "@contexts";
import React, { useState } from "react";

const EnvCheck = () => {
  const { goNext } = useStepContext();
  const [video, setVideo] = useState(true); // TODO: 화면 녹화 시 setVideo

  return (
    <Stack direction={"row"}>
      <div style={{ width: 500, height: 400, backgroundColor: "black" }}>
        <div style={{ width: 20, height: 20 }}>
          <FrontCamera />
        </div>
      </div>
    </Stack>
  );
};

export default React.memo(EnvCheck);
