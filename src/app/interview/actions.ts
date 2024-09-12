"use server";

export const speechToText = async (base64Audio: string) => {
  const apiKey = process.env.GOOGLE_SPEECH_API_KEY;

  const response = await fetch(
    `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        config: {
          encoding: "WEBM_OPUS",
          sampleRateHertz: 48000,
          languageCode: "ko-KR",
        },
        audio: {
          content: base64Audio,
        },
      }),
    }
  );
  const res = await response.json();

  if (res?.results && res.results.length > 0) {
    return res.results[0].alternatives[0].transcript as string;
  }

  return null;
};

export const textToSpeech = async (text: string) => {
  // if (1 == 1) return "";
  const apiKey = process.env.GOOGLE_SPEECH_API_KEY;
  console.log({ text, apiKey });
  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        input: {
          text,
        },
        voice: {
          languageCode: "ko-KR",
        },
        audioConfig: { audioEncoding: "MP3" },
      }),
    }
  );

  console.log(response);

  const res = await response.json();

  if (res?.audioContent) {
    const audioContent: string = res["audioContent"];
    const dataString = `data:audio/mp3;base64,${audioContent}`;
    return dataString;
  }

  return null;
};

function importRsaKey(pem: string, header: string, footer: string) {
  // fetch the part of the PEM string between header and footer
  const pemContents = pem.substring(
    header.length,
    pem.length - footer.length - 1
  );

  console.log(pemContents);

  return pemContents;
  // base64 decode the string to get the binary data
}

export const getKey = async () => {
  console.log(process.env.RSA_PUBLIC_KEY);
  return {
    publicKey: importRsaKey(
      process.env.RSA_PUBLIC_KEY,
      "-----BEGIN PUBLIC KEY-----",
      "-----END PUBLIC KEY-----"
    ),
    privateKey: importRsaKey(
      process.env.RSA_PRIVATE_KEY,
      "-----BEGIN PRIVATE KEY-----",
      "-----END PRIVATE KEY-----"
    ),
  };
};
