class MediaDeviceManager {
  private mediaStream: MediaStream | null = null;
  private initiated = false;
  private mediaStreamResolvers: ((value: null) => void)[] = [];

  public initMedia = () => {
    getDevices({
      onReady: (m) => {
        this.mediaStream = m;
        this.initiated = true;
        this.mediaStreamResolvers.forEach((resolve) => resolve(null));
      },
      onError: () => undefined,
    });
  };

  public getMediaStream = async () => {
    if (this.initiated) return this.mediaStream as MediaStream;
    await new Promise((resolve: (v: null) => void) => {
      this.mediaStreamResolvers.push(resolve);
    });
    return this.mediaStream as MediaStream;
  };
}

const getDevices = async ({
  onReady,
  onError,
}: {
  onReady: (mediaStream: MediaStream) => void;
  onError: () => void;
}) => {
  const _video = document.querySelector("#videoElement");

  if (!_video) return;

  try {
    const mediaStream = await navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
      audio: true,
    });
    // TODO(Sue): 삭제
    // if (!videoMediaStream) throw new Error();
    onReady(mediaStream);
  } catch (e) {
    console.log("no front camera");
    onError();
  }
};

export default new MediaDeviceManager();
