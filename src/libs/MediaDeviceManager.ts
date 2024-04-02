class MediaDeviceManager {
  private mediaStream: MediaStream | null = null;
  private initiated = false;
  private initiating = false;
  private mediaStreamResolvers: ((value: null) => void)[] = [];

  private initMedia = async () => {
    if (this.initiating) return;
    this.initiating = true;
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

      //TODO: audio 이후 플레이 필요할 경우 사용
      // const audio = document.querySelector("#audioElement") as HTMLAudioElement;
      // audio.srcObject = mediaStream;
      this.mediaStreamResolvers.forEach((resolve) => resolve(null));
    } catch (e) {
      console.log("no front camera");
    }
    this.initiating = true;
  };

  public getMediaStream = async () => {
    if (this.initiated) {
      this.enableAll();
      return this.mediaStream as MediaStream;
    }
    this.initMedia();
    await new Promise((resolve: (v: null) => void) => {
      this.mediaStreamResolvers.push(resolve);
    });
    return this.mediaStream as MediaStream;
  };

  public enableAll = () => {
    if (!this.initiated) return;
    const mediaStream = this.mediaStream as MediaStream;

    mediaStream.getTracks().forEach((track) => (track.enabled = true));
  };

  public disableAll = () => {
    if (!this.initiated) return;
    const mediaStream = this.mediaStream as MediaStream;
    mediaStream.getTracks().forEach((track) => track.stop());
  };
}

const mediaDeviceManager = new MediaDeviceManager();
export default mediaDeviceManager;
