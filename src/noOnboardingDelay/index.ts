import { Patch } from "@moonlight-mod/types";

// https://github.com/Vendicated/Vencord/blob/main/src/plugins/noOnboardingDelay/index.ts

export const patches: Patch[] = [
  {
    find: ",{className:g.__invalid_subtitle}):",
    replace: {
      match: "3e3",
      replacement: "0"
    }
  }
];
