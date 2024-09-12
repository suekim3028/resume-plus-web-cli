const importRsaKey = (pem: string, header: string, footer: string) => {
  // fetch the part of the PEM string between header and footer
  const pemContents = pem.substring(
    header.length,
    pem.length - footer.length - 1
  );

  return pemContents;
  // base64 decode the string to get the binary data
};

export const getRsaKeyString = async () => {
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
