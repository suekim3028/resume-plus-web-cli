import * as animationData from "@public/lotties/loading.json";
import Lottie from "react-lottie";

const Spinner = ({ size }: { size: number }) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={size}
      width={size}
    />
  );
};

export default Spinner;
