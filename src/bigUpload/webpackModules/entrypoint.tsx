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


async function resolveFile(options: Argument[], channelId: string): Promise<File | null> {
    for (const opt of options) {
        if (opt.name === "file") {
            const upload = UploadAttachmentStore.getUpload(channelId, opt.name, DraftType.SlashCommand);
            return upload.item.file;
        }
    }
    return null;
};


async function uploadFileToGofile(file: File, channelId: string) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const fileName = file.name;
        const fileType = file.type;

        const serverResponse = await fetch("https://api.gofile.io/servers");
        const serverData = await serverResponse.json();
        const server = serverData.data.servers[Math.floor(Math.random() * serverData.data.servers.length)].name;

        const uploadResult = await Natives.uploadFileToGofileNative(`https://${server}.gofile.io/uploadFile`, arrayBuffer, fileName, fileType);

        if ((uploadResult as any).status === "ok") {
            const { downloadPage } = (uploadResult as any).data;
            setTimeout(() => sendTextToChat(`${downloadPage} `), 10);
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        }
        else {
            console.error("Unable to upload file. This is likely an issue with your network connection, firewall, or VPN.", uploadResult);
            makeToast("File Upload Failed");
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        }
    } catch (error) {
        console.error("Unable to upload file. This is likely an issue with your network connection, firewall, or VPN.", error);
        makeToast("File Upload Failed");
        UploadManager.clearAll(channelId, DraftType.SlashCommand);
    }
};


async function uploadFileToCatbox(file: File, channelId: string) {
    try {
        const url = "https://catbox.moe/user/api.php";
        //const userHash = settings.store.catboxUserHash;
        const userHash = "";
        const fileSizeMB = file.size / (1024 * 1024);

        const arrayBuffer = await file.arrayBuffer();
        const fileName = file.name;

        const uploadResult = await Natives.uploadFileToCatboxNative(url, arrayBuffer, fileName, file.type);

        if (uploadResult.startsWith("https://") || uploadResult.startsWith("http://")) {
            const videoExtensions = [".mp4", ".mkv", ".webm", ".avi", ".mov", ".flv", ".wmv", ".m4v", ".mpg", ".mpeg", ".3gp", ".ogv"];
            let finalUrl = uploadResult;

            if (fileSizeMB >= 150 && videoExtensions.some(ext => finalUrl.endsWith(ext))) {
                finalUrl = `https://embeds.video/${finalUrl}`;
            }

            setTimeout(() => sendTextToChat(`${finalUrl} `), 10);
            makeToast("File Successfully Uploaded!");
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        } else {
            console.error("Unable to upload file. This is likely an issue with your network connection, firewall, or VPN.", uploadResult);
            makeToast("File Upload Failed");
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        }
    } catch (error) {
        console.error("Unable to upload file. This is likely an issue with your network connection, firewall, or VPN.", error);
        makeToast("File Upload Failed");
        UploadManager.clearAll(channelId, DraftType.SlashCommand);
    }
};


async function uploadFileToLitterbox(file: File, channelId: string) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const fileName = file.name;
        const fileType = file.type;
        const fileSizeMB = file.size / (1024 * 1024);
        //const time = settings.store.litterboxTime;
        const time = "24h";

        const uploadResult = await Natives.uploadFileToLitterboxNative(arrayBuffer, fileName, fileType, time);

        if (uploadResult.startsWith("https://") || uploadResult.startsWith("http://")) {
            const videoExtensions = [".mp4", ".mkv", ".webm", ".avi", ".mov", ".flv", ".wmv", ".m4v", ".mpg", ".mpeg", ".3gp", ".ogv"];
            let finalUrl = uploadResult;

            if (fileSizeMB >= 150 && videoExtensions.some(ext => finalUrl.endsWith(ext))) {
                finalUrl = `https://embeds.video/${finalUrl}`;
            }

            setTimeout(() => sendTextToChat(`${finalUrl}`), 10);
            makeToast("File Successfully Uploaded!");
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        } else {
            console.error("Unable to upload file. This is likely an issue with your network connection, firewall, or VPN.", uploadResult);
            makeToast("File Upload Failed");
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
        }
    } catch (error) {
        console.error("Unable to upload file. This is likely an issue with your network connection, firewall, or VPN.", error);
        makeToast("File Upload Failed");
        UploadManager.clearAll(channelId, DraftType.SlashCommand);
    }
};


async function uploadFile(file: File, channelId: string) {
    switch (uploadService) {
        case "Gofile":
            await uploadFileToGofile(file, channelId);
            break;
        case "Catbox":
            await uploadFileToCatbox(file, channelId);
            break;
        case "Litterbox":
            await uploadFileToLitterbox(file, channelId);
            break;
        default:
            makeToast("Error: invalid uploader");
            UploadManager.clearAll(channelId, DraftType.SlashCommand);
    }
};


function triggerFileUpload() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    fileInput.onchange = async event => {
        const target = event.target as HTMLInputElement;
        if (target && target.files && target.files.length > 0) {
            const file = target.files[0];
            if (file) {
                const channelId = SelectedChannelStore.getChannelId();
                await uploadFile(file, channelId);
            } else {
                makeToast("No file selected");
            }
        }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
};


const ctxMenuPatch: NavContextMenuPatchCallback = (children, props) => {
    if (props.channel.guild_id && !PermissionStore.can(Permissions.SEND_MESSAGES, props.channel)) return;

    children.splice(1, 0,
        <Menu.MenuItem
            id="upload-big-file"
            label={
                <div className={OptionClasses.optionLabel}>
                    <OpenExternalIcon className={OptionClasses.optionIcon} height={24} width={24} />
                    <div className={OptionClasses.optionName}>Upload a Big File</div>
                </div>
            }
            action={triggerFileUpload}
        />
    );
};


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


Commands.registerCommand({
  id: "test",
  description: "test",
  inputType: InputType.BUILT_IN,
  type: CommandType.CHAT,
  options: [],
  execute: () => {
    console.log("Test");
  }
});
