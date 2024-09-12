import { getRsaKeyString } from "@actions/common";

const str2ab = (str: string) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

const getRsaCryptoKeys = async () => {
  const { publicKey: _publicKey, privateKey: _privateKey } =
    await getRsaKeyString();

  const binaryPublic = str2ab(window.atob(_publicKey));
  const binaryPrivate = str2ab(window.atob(_privateKey));

  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    binaryPublic,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );

  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    binaryPrivate,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["decrypt"]
  );

  /**
   * The header -----BEGIN RSA PRIVATE KEY----- in the PEM file is reserved to PKCS#1 keys, but WebCryptoApi does not support pkcs1, so you need to convert the key from PKCS#1 to PKCS#8 using a tool like openssl.
   * # openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in pkcs1.key -out pkcs8.key
   */
  return { privateKey, publicKey };
};

export const encrypt = async (text: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const { publicKey } = await getRsaCryptoKeys();

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoder.encode("안녕하세요")
  );

  return decoder.decode(encrypted);
};

export const decrypt = async (text: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const { privateKey } = await getRsaCryptoKeys();

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encoder.encode(text)
  );

  return decoder.decode(decrypted);
};
