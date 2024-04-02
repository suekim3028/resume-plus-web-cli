const DisplayMediaRecorder = () => {
  let mediaRecorder: MediaRecorder;
  const record = async ({
    onDataAvailable,
  }: {
    onDataAvailable: (url: string) => void;
  }) => {
    const displayMedia = await navigator.mediaDevices?.getDisplayMedia();

    mediaRecorder = new MediaRecorder(displayMedia);
    mediaRecorder.ondataavailable = (ev) => {
      if (ev.data.size <= 0) return;
      const blob = new Blob([ev.data], {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);
      onDataAvailable(url);
    };
    mediaRecorder.start();
  };

  const stop = () => {
    mediaRecorder.stop();
  };

  return { record, stop };
};

export default DisplayMediaRecorder;
