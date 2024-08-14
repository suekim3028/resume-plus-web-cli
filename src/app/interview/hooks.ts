"use client";
import { useCallback, useEffect, useRef } from "react";
import { audioBlobToBase64 } from "./utils";

export const useRecorder = (onRecordEnd: (text: string) => void) => {
  const mediaStream = useRef<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder>();
  const analyzer = useRef<AnalyserNode>();
  const recordData = useRef<Blob[]>([]);

  /**
   * 녹음기 처음 세팅
   */
  const initStream = useCallback(async () => {
    // stream init
    const _mediaStream = await navigator.mediaDevices?.getUserMedia({
      video: false,
      audio: true,
    });
    mediaStream.current = _mediaStream;

    // analyzer init
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(_mediaStream);
    analyzer.current = audioContext.createAnalyser();
    source.connect(analyzer.current);
  }, []);

  /**
   * 녹음기 데이터 가져오기 (onstop 에서 호출됨)
   */
  const processRecordedData = async () => {
    const recorded = recordData.current;
    console.log(recorded.length);
    if (!recorded.length) return;

    const blob = new Blob(recorded);
    const base64Audio = await audioBlobToBase64(blob);

    // const text = await speechToText(base64Audio);
    const text = "ㅎㅎㅎㅎㅎㅎ";
    onRecordEnd(text);
  };

  /**
   * 녹음 시작
   */
  const soundCheckInterval = useRef<NodeJS.Timeout>();
  const silenceTimeout = useRef<NodeJS.Timeout>();
  const startRecorder = useCallback(async () => {
    const _mediaStream = mediaStream.current;
    if (!_mediaStream) return;

    // recorder init
    const _mediaRecorder = new MediaRecorder(_mediaStream);
    console.log("===새로운 레코더 !");
    recordData.current = [];
    mediaRecorder.current = _mediaRecorder;

    _mediaRecorder.onstop = processRecordedData;
    _mediaRecorder.ondataavailable = (ev) => {
      console.log("--data");
      if (ev.data.size <= 0) return;
      recordData.current.push(ev.data);
    };
    _mediaRecorder.start();

    soundCheckInterval.current = setInterval(() => {
      const level = analyzer.current ? getSoundLevel(analyzer.current) : 0;
      if (level > 0.05) {
        console.log("----- timeout 리셋");
        // 5% 이상이면 계속 들음
        clearTimeout(silenceTimeout.current);
        silenceTimeout.current = setTimeout(() => {
          console.log("----timout 끝!!!");
          mediaRecorder.current?.stop();
          clearInterval(soundCheckInterval.current);
          clearTimeout(silenceTimeout.current);
        }, 3000);
      }
    }, 200);

    // 음성 녹음
    console.log("녹음 ~ ~ ~ ~ 시작!");
  }, [processRecordedData]);

  /**
   * 녹음기 리셋
   */
  const resetRecorder = useCallback(() => {
    console.log("=====RESET");
    if (mediaRecorder.current) mediaRecorder.current.onstop = null;
    mediaRecorder.current?.stop();
    recordData.current = [];
    clearInterval(soundCheckInterval.current);
    clearTimeout(silenceTimeout.current);
  }, []);

  /**
   * 녹음기 없애기
   */
  const disposeRecorder = useCallback(() => {
    mediaStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
  }, []);

  const effected = useRef(false);
  useEffect(() => {
    if (effected.current) return;
    effected.current = true;
    initStream();
    return disposeRecorder;
  }, []);

  return { resetRecorder, startRecorder };
};

const getSoundLevel = (analyzer: AnalyserNode) => {
  const array = new Uint8Array(analyzer.fftSize);
  analyzer.getByteTimeDomainData(array);
  return (
    array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
    128
  );
};
