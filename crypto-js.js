import CryptoJS from "crypto-js";

export class EncryptionServiceWithCryptoJS {
    constructor(iv, password) {
        this.iv = CryptoJS.enc.Utf8.parse(iv);
        this.password = password;
    }

    async getEncryptionKey() {
        return CryptoJS.enc.Utf8.parse(
            CryptoJS.PBKDF2(this.password, "salt", {
                keySize: 256 / 32,
                iterations: 1000,
            })
        );
    }

    async encrypt(textToEncrypt) {
        const encryptionKey = await this.getEncryptionKey();

        const encryptionOptions = {
            iv: this.iv,
            padding: CryptoJS.pad.NoPadding,
            mode: CryptoJS.mode.CTR,
        };

        const cipher = CryptoJS.AES.encrypt(
            textToEncrypt,
            encryptionKey,
            encryptionOptions
        );

        const encryptedText = cipher.ciphertext.toString(CryptoJS.enc.Hex);

        return encryptedText;
    }

    async decrypt(encryptedText) {
        const encryptionKey = await this.getEncryptionKey();

        const encryptionOptions = {
            iv: this.iv,
            padding: CryptoJS.pad.NoPadding,
            mode: CryptoJS.mode.CTR,
        };

        const decipher = CryptoJS.AES.decrypt(
            CryptoJS.enc.Hex.parse(encryptedText),
            encryptionKey,
            encryptionOptions
        );

        const decryptedText = decipher.toString(CryptoJS.enc.Utf8);

        return decryptedText;
    }
}
