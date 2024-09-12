import { getKey } from "@app/interview/actions";

export * as inputUtils from "./input";
export * as userUtils from "./user";
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export const getRsaKeys = async () => {
  const decoder = new TextDecoder();

  const { publicKey: _publicKey, privateKey: _privateKey } = await getKey();

  console.log(_publicKey, _privateKey);
  const binaryPublic = str2ab(window.atob(_publicKey));
  const binaryPrivate = str2ab(window.atob(_privateKey));
  // RSA PRIVATE `` 은

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
