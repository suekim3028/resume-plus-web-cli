import mediaDeviceManager from "./MediaDeviceManager";

const CurrentMediaRecorder = () => {
  let mediaRecorder: MediaRecorder;
  const record = async ({
    onDataAvailable,
  }: {
    onDataAvailable: (url: string) => void;
  }) => {
    const mediaStream = await mediaDeviceManager.getMediaStream();
    if (!mediaStream) return null;

    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = (ev) => {
      console.log("===================");
      console.log(ev);
      if (ev.data.size <= 0) return;
      const blob = new Blob([ev.data], {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      onDataAvailable(url);
    };
    mediaRecorder.start();
  };

  const stop = () => {
    console.log(mediaRecorder);
    mediaRecorder.stop();
  };

  return { record, stop };
};

export default CurrentMediaRecorder;
