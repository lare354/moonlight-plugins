import { SelectedChannelStore, ChannelStore, PermissionStore, UploadAttachmentStore } from "@moonlight-mod/wp/common_stores";
import Commands from "@moonlight-mod/wp/commands_commands";
import React from "@moonlight-mod/wp/react";
import spacepack from "@moonlight-mod/wp/spacepack_spacepack";
import Permissions from "@moonlight-mod/wp/discord/Constants";
import { Tooltip, createToast, showToast } from "@moonlight-mod/wp/discord/components/common/index";
import { InputType, CommandType, OptionType } from "@moonlight-mod/types/coreExtensions/commands";


const { sendMessage } = spacepack.require("discord/actions/MessageActionCreators").default;
const ChatBarButton = spacepack.findByCode("CHAT_INPUT_BUTTON_NOTIFICATION,width")[0].exports.A;
//const Button = spacepack.findByCode(".GREEN,positionKeyStemOverride:")[0].exports.A;
const getNonce = Object.values(spacepack.findByCode(".fromTimestampWithSequence")[1].exports)[0];
const DraftType = spacepack.findByCode("ChannelMessage", "SlashCommand", "ThreadSettings", "FirstThreadMessage")[0].exports.C;
const UploadManager = spacepack.findByCode('dispatch({type:"UPLOAD_ATTACHMENT_CLEAR_ALL_FILES",channelId:')[0].exports.A;

/* based on https://github.com/Its3rr0rsWRLD/fileShare */


let uploadService = moonlight.getConfigOption<string>("bigUpload", "uploadService") ?? "Catbox";

const Natives = moonlight.getNatives("bigUpload");

function makeToast(...args: any[]) {
    showToast(createToast(...args))
};


function sendTextToChat(text: string) {
    const channelId = SelectedChannelStore.getChannelId();
    sendMessage(channelId, { content: text }, void 0, { nonce: getNonce() });
};

// Helper function to safely get error messages
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return String(error);
}

async function resolveFile(options: any[], channelId: any): Promise<File | null> {
    for (const opt of options) {
        if (opt.name === "file") {
            const upload = UploadAttachmentStore.getUpload(channelId, opt.name, DraftType.SlashCommand);
            return upload.item.file;
        }
    }
    return null;
};


/**
 * Catbox upload
 */
async function uploadFileToCatboxWithStreaming(file: File, channelId: string) {
    console.log(`[Catbox] Starting upload for ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);

    const url = "https://catbox.moe/user/api.php";
    const userHash = "";

    try {
        console.log("[Catbox] Converting file to ArrayBuffer...");
        const arrayBuffer = await file.arrayBuffer();
        console.log(`[Catbox] ArrayBuffer conversion completed (${arrayBuffer.byteLength} bytes)`);
        console.log(`[Catbox] Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);

        const uploadResult = await Natives.uploadFileToCatboxNative(
            url,
            arrayBuffer,
            file.name,
            file.type,
            userHash
        );

        if (uploadResult.startsWith("https://") || uploadResult.startsWith("http://")) {
            let finalUrl = uploadResult;

            setTimeout(() => sendTextToChat(`${finalUrl} `), 10);
            showToast(`${file.name} Successfully Uploaded to Catbox!`, Toasts.Type.SUCCESS);
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        } else {
            throw new Error(`Catbox upload failed: ${uploadResult}`);
        }
    } catch (nativeError) {
        throw new Error(`Catbox streaming upload failed: ${getErrorMessage(nativeError)}`);
    }
}

/**
 * Litterbox upload
 */
async function uploadFileToLitterboxWithStreaming(file: File, channelId: string) {
    console.log(`[Litterbox] Starting upload for ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);

    const expireTime = "24h";

    try {
        console.log("[Litterbox] Converting file to ArrayBuffer...");
        const arrayBuffer = await file.arrayBuffer();
        console.log(`[Litterbox] ArrayBuffer conversion completed (${arrayBuffer.byteLength} bytes)`);
        console.log(`[Litterbox] Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);

        const uploadResult = await Natives.uploadFileToLitterboxNative(
            arrayBuffer,
            file.name,
            file.type,
            expireTime
        );

        if (uploadResult.startsWith("https://") || uploadResult.startsWith("http://")) {
            let finalUrl = uploadResult;

            setTimeout(() => sendTextToChat(`${finalUrl}`), 10);
            showToast(`${file.name} Successfully Uploaded to Litterbox!`, Toasts.Type.SUCCESS);
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        } else {
            throw new Error(`Litterbox upload failed: ${uploadResult}`);
        }
    } catch (nativeError) {
        throw new Error(`Litterbox streaming upload failed: ${getErrorMessage(nativeError)}`);
    }
}

async function uploadFile(file: File, channelId: string) {
    const fileSizeMB = file.size / (1024 * 1024);

    console.log(`[BigFileUpload] Starting upload for file: ${file.name}`);
    console.log(`[BigFileUpload] File size: ${file.size} bytes (${fileSizeMB.toFixed(1)}MB)`);


    // Use streaming upload functions with timeout
    const uploadPromise = (() => {
        switch (uploadService) {
            case "Gofile":
                return uploadFileToGofileWithStreaming(file, channelId);
            case "Catbox":
                return uploadFileToCatboxWithStreaming(file, channelId);
            case "Litterbox":
                return uploadFileToLitterboxWithStreaming(file, channelId);
            default:
                makeToast("Error: invalid uploader");
        }
    })();
}



Commands.registerCommand({
  id: "upload",
  description: "Upload a file",
  inputType: InputType.BUILT_IN,
  type: CommandType.CHAT,
  options: [
    {
      name: "file",
      description: "The file to upload",
      type: OptionType.ATTACHMENT,
      required: true,
    }
  ],
  execute: async (opts) => {
    const channelId = SelectedChannelStore.getChannelId();
    const file = await resolveFile(opts, channelId);
    if (file) {
      await uploadFile(file, channelId);
    } else {
      UploadManager.clearAll(channelId, DraftType.SlashCommand);
    }
  }
});

