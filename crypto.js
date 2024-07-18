import { createCipheriv, createDecipheriv, scrypt } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class EncryptionServiceWithCrypto {
    constructor(iv, password) {
        this.iv = iv;
        this.password = password;
        this.algorithm = "aes-256-ctr";
    }

    async getEncryptionKey() {
        // The key length is dependent on the algorithm.
        // In this case for aes256, it is 32 bytes.
        return asyncScrypt(this.password, "salt", 32);
    }

    async encrypt(textToEncrypt) {
        const encryptionKey = await this.getEncryptionKey();

        const cipher = createCipheriv(this.algorithm, encryptionKey, this.iv);

        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]).toString("hex");

        return encryptedText;
    }

    async decrypt(encryptedText) {
        const encryptionKey = await this.getEncryptionKey();

        const decipher = createDecipheriv(
            this.algorithm,
            encryptionKey,
            this.iv
        );

        const decryptedText = Buffer.concat([
            decipher.update(Buffer.from(encryptedText, "hex")),
            decipher.final(),
        ]).toString("utf8");

        return decryptedText;
    }
}
