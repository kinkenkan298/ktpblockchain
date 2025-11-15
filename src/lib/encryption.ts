export const generateHashBlockchain = (cid: string): string => {
  const timestamp = Date.now().toString();
  const dataToHash = `${cid}:${timestamp}`;
  return new Bun.CryptoHasher("sha256").update(dataToHash).digest("hex");
};
export const verifyHashBlockchain = (
  cid: string,
  hash_blockchain: string,
  timestamp: string
): boolean => {
  const dataToHash = `${cid}:${timestamp}`;
  const hash = new Bun.CryptoHasher("sha256").update(dataToHash).digest("hex");
  return hash_blockchain === hash;
};

export const generateShortHash = (input: string): string => {
  return new Bun.CryptoHasher("sha256").update(input).digest("hex");
};

export const hashNik = (nik: string): string => {
  const salt = process.env.NIK_HASH_SALT || "default-salt";

  return new Bun.CryptoHasher("sha256").update(`${nik}:${salt}`).digest("hex");
};
