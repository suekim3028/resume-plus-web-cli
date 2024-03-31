import { useStepContext } from "@contexts";
import { Font, Layout as L } from "@design-system";
import React, { useEffect, useState } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { FrontCamera } from "@components";
import { commonHooks } from "@web-core";
import { MediaDeviceManager } from "@libs";

const EnvCheck = () => {
  const { goNext } = useStepContext();
  const [video, setVideo] = useState(true); // TODO: 화면 녹화 시 setVideo

  return (
    <Stack direction={"row"}>
      <div style={{ width: 20, height: 20 }}>
        <FrontCamera />
      </div>
    </Stack>
  );
};

export default React.memo(EnvCheck);
