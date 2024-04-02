class MediaDeviceManager {
  private mediaStream: MediaStream | null = null;
  private initiated = false;
  private initiating = false;
  private mediaStreamResolvers: ((value: null) => void)[] = [];
  private cameraOn = true;
  private audioOn = true;

  private getUserMedia = () =>
    navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
      audio: true,
    });
  private initMedia = async () => {
    if (this.initiating) return;
    this.initiating = true;
    try {
      const mediaStream = await this.getUserMedia();
      // TODO(Sue): 삭제
      // if (!videoMediaStream) throw new Error();
      this.mediaStream = mediaStream;
      this.initiated = true;

      //TODO: audio 이후 플레이 필요할 경우 사용
      // const audio = document.querySelector("#audioElement") as HTMLAudioElement;
      // audio.srcObject = mediaStream;
      this.mediaStreamResolvers.forEach((resolve) => resolve(null));
      this.audioOn = true;
      this.cameraOn = true;
    } catch (e) {
      console.log("no front camera");
    }
    this.initiating = true;
  };

  public getMediaStream = async () => {
    if (this.initiated) {
      return this.mediaStream as MediaStream;
    }
    this.initMedia();
    await new Promise((resolve: (v: null) => void) => {
      this.mediaStreamResolvers.push(resolve);
    });
    return this.mediaStream as MediaStream;
  };

  public disableMediaStream = () => {
    if (!this.mediaStream) return;
    this.mediaStream.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
    this.initiated = false;
  };

  public toggleCamera = () => {
    if (!this.mediaStream) return false;

    this.mediaStream.getVideoTracks().forEach((t) => {
      t.enabled = !this.cameraOn;
    });
    this.cameraOn = !this.cameraOn;
    return this.cameraOn;
  };

  public toggleAudio = () => {
    if (!this.mediaStream) return false;

    this.mediaStream.getAudioTracks().forEach((t) => {
      t.enabled = !this.audioOn;
    });
    this.audioOn = !this.audioOn;
    return this.audioOn;
  };
}

const mediaDeviceManager = new MediaDeviceManager();
export default mediaDeviceManager;
