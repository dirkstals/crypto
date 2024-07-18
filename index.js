import { EncryptionServiceWithCrypto } from "./crypto.js";
import { EncryptionServiceWithCryptoJS } from "./crypto-js.js";

const iv = "0000000000000000";
const password = "abc123-abc123-abc123";

(async function () {
    const rawBody = `this is a test phrase.`;

    const cryptoService = new EncryptionServiceWithCrypto(iv, password);
    const cryptoJSService = new EncryptionServiceWithCryptoJS(iv, password);

    console.log("\n");

    const encryptedBodyJS = await cryptoJSService.encrypt(rawBody);
    const encryptedBody = await cryptoService.encrypt(rawBody);
    console.log("encrypt with CryptoJS:", encryptedBodyJS);
    console.log("encrypt with Crypto  :", encryptedBody);

    const decryptedBodyJS = await cryptoJSService.decrypt(encryptedBody);
    const decryptedBody = await cryptoService.decrypt(encryptedBodyJS);
    console.log("decrypt with CryptoJS:", decryptedBodyJS);
    console.log("decrypt with Crypto  :", decryptedBody);

    console.log("\n");

    const succeeded =
        encryptedBodyJS === encryptedBody && decryptedBody === decryptedBodyJS;
    console.log(
        !succeeded
            ? "You've won! Congratulations."
            : "No luck yet, please try again."
    );

    console.log("\n");
})();
