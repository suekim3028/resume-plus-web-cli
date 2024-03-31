class MediaDeviceManager {
  private mediaStream: MediaStream | null = null;
  private initiated = false;
  private mediaStreamResolvers: ((value: null) => void)[] = [];

  public initMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
        },
        audio: true,
      });
      // TODO(Sue): 삭제
      // if (!videoMediaStream) throw new Error();
      this.mediaStream = mediaStream;
      this.initiated = true;
      this.mediaStreamResolvers.forEach((resolve) => resolve(null));
    } catch (e) {
      console.log("no front camera");
    }
  };

  public getMediaStream = async () => {
    if (this.initiated) return this.mediaStream as MediaStream;
    this.initMedia();
    await new Promise((resolve: (v: null) => void) => {
      this.mediaStreamResolvers.push(resolve);
    });
    return this.mediaStream as MediaStream;
  };
}

const mediaDeviceManager = new MediaDeviceManager();
export default mediaDeviceManager;
