class VideoAndAudioRecorder {
  private mediaStream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  constructor(
    onLoadEnd: (mediaStream: MediaStream) => void,
    onRecord: (url: string) => void
  ) {
    this.init(onLoadEnd, onRecord);
  }

  public startRecording = () => {
    this.recorder?.start();
  };

  public stopRecordingAndDestroy = () => {
    this.recorder?.stop();
    this.mediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    this.mediaStream = null;
  };

  private init = async (
    onLoadEnd: (mediaStream: MediaStream) => void,
    onRecord: (url: string) => void
  ) => {
    if (!this.mediaStream) await this.initStream();
    this.initRecorder(onRecord);
    if (!this.mediaStream) return;
    onLoadEnd(this.mediaStream);
  };

  private initStream = async () => {
    this.mediaStream = await navigator.mediaDevices?.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
      audio: true,
    });
    this.recorder = new MediaRecorder(this.mediaStream);
  };

  private initRecorder = (onRecord: (url: string) => void) => {
    if (!this.mediaStream) return;
    this.recorder = new MediaRecorder(this.mediaStream);
    this.attachDataHandlerToRecorder(onRecord);
  };

  private attachDataHandlerToRecorder = (cb: (url: string) => void) => {
    if (!this.recorder) return;
    this.recorder.ondataavailable = (ev) => {
      if (ev.data.size <= 0) return;
      const blob = new Blob([ev.data], {
        type: "video/webm",
      });

      const url = window.URL.createObjectURL(blob);
      cb(url);
    };
  };
}

export default VideoAndAudioRecorder;
