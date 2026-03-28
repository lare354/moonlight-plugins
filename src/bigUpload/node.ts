/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/* >>>>>>>>>>>>>>>> https://github.com/Its3rr0rsWRLD/fileShare/blob/main/native.ts <<<<<<<<<<<<<<<< */

export async function uploadFileToGofileNative(_, url: string, fileBuffer: ArrayBuffer, fileName: string, fileType: string, token?: string): Promise<string> {
    try {
        const formData = new FormData();

        const file = new Blob([fileBuffer], { type: fileType });
        formData.append("file", new File([file], fileName));

        if (token) {
            formData.append("token", token);
        }

        const options: RequestInit = {
            method: "POST",
            body: formData,
        };

        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error during fetch request:", error);
        throw error;
    }
}



export async function uploadFileToCatboxNative(_, url: string, fileBuffer: ArrayBuffer, fileName: string, fileType: string): Promise<string> {
    try {
        const formData = new FormData();
        formData.append("reqtype", "fileupload");

        const file = new Blob([fileBuffer], { type: fileType });
        formData.append("fileToUpload", new File([file], fileName));

        const options: RequestInit = {
            method: "POST",
            body: formData,
        };

        const response = await fetch(url, options);
        const result = await response.text();
        return result;
    } catch (error) {
        console.error("Error during fetch request:", error);
        throw error;
    }
}

export async function uploadFileToLitterboxNative(_, fileBuffer: ArrayBuffer, fileName: string, fileType: string, time: string): Promise<string> {
    try {
        const formData = new FormData();

        formData.append("reqtype", "fileupload");

        formData.append(time, time);

        const file = new Blob([fileBuffer], { type: fileType });
        formData.append("fileToUpload", new File([file], fileName));

        const options: RequestInit = {
            method: "POST",
            body: formData,
        };

        const response = await fetch("https://litterbox.catbox.moe/resources/internals/api.php", options);
        const result = await response.text();
        return result;
    } catch (error) {
        console.error("Error during fetch request:", error);
        throw error;
    }
}
