/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/*
 * GoFile upload
 */
export async function uploadFileToGofileNative(_, url: string, fileBuffer: ArrayBuffer, fileName: string, fileType: string, token?: string): Promise<string> {
    try {
        console.log(`[GoFile] Starting upload of ${fileName} (${fileBuffer.byteLength} bytes)`);

        const formData = new FormData();
        const file = new Blob([fileBuffer], { type: fileType });
        formData.append("file", new File([file], fileName));

        if (token) {
            formData.append("token", token);
        }

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("[GoFile] Upload completed successfully");
        return result;
    } catch (error) {
        console.error("Error during GoFile upload:", error);
        throw error;
    }
}

/*
 * Catbox upload
 */
export async function uploadFileToCatboxNative(_, url: string, fileBuffer: ArrayBuffer, fileName: string, fileType: string, userHash: string): Promise<string> {
    try {
        console.log(`[Catbox] Starting upload of ${fileName} (${fileBuffer.byteLength} bytes)`);

        const formData = new FormData();
        formData.append("reqtype", "fileupload");

        const file = new Blob([fileBuffer], { type: fileType });
        formData.append("fileToUpload", new File([file], fileName));
        formData.append("userhash", userHash);

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const result = await response.text();
        console.log("[Catbox] Upload completed successfully");
        return result;
    } catch (error) {
        console.error("Error during Catbox upload:", error);
        throw error;
    }
}

/*
 * Litterbox upload
 */
export async function uploadFileToLitterboxNative(_, fileBuffer: ArrayBuffer, fileName: string, fileType: string, expireTime: string): Promise<string> {
    try {
        console.log(`[Litterbox] Starting upload of ${fileName} (${fileBuffer.byteLength} bytes)`);

        if (!expireTime){
            expireTime = "24h"
        }

        const formData = new FormData();
        formData.append("reqtype", "fileupload");

        const file = new Blob([fileBuffer], { type: fileType });
        formData.append("fileToUpload", new File([file], fileName));
        formData.append("time", expireTime);

        const response = await fetch("https://litterbox.catbox.moe/resources/internals/api.php", {
            method: "POST",
            body: formData,
        });

        const result = await response.text();
        console.log("[Litterbox] Upload completed successfully");
        return result;
    } catch (error) {
        console.error("Error during Litterbox upload:", error);
        throw error;
    }
}
