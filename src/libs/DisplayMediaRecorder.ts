class DisplayMediaRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private mediaBlob: Blob[] = [];

  public init = async () => {
    const displayMedia = await navigator.mediaDevices?.getDisplayMedia();
    this.mediaRecorder = new MediaRecorder(displayMedia);
    this.mediaRecorder.ondataavailable = (ev) => {
      if (ev.data.size <= 0) return;
      this.mediaBlob.push(ev.data);
    };
  };

  public start = () => {
    this.mediaRecorder?.start();
  };

  public stop = () => {
    this.mediaRecorder?.stop();
    const blob = new Blob(this.mediaBlob, {
      type: "video/mp4",
    });
    const url = URL.createObjectURL(blob);
    return url;
  };

  public pause = () => {
    this.mediaRecorder?.pause();
  };

  public resume = () => {
    this.mediaRecorder?.resume();
  };
}

export default DisplayMediaRecorder;
